import { ResponderHttps } from "../config/https";
import { IResponder, IResponderSigninPayload, IResponderSignupPayload } from "../types/service-types";
import { SERVICE_PATHS } from "../types/services";

const services = SERVICE_PATHS.Responder;
const account = services.account();

export class ResponderAccountService {
    public static async whoami(context?: any) {
        const [code, data] = await ResponderHttps.query({
            service: account.whoami,
        });

        if (code === 0) {
            if (context) {
                if (context?.updateContext) {
                    context.updateContext((draft: any) => {
                        if (!draft?.currentResponder) return;

                        draft!.currentResponder!.user = data;
                    });
                }
            }
        }

        return [code, data];
    }

    public static async signup(payload: IResponderSignupPayload) {
        return ResponderHttps.query({
            service: account.signup,
            body: payload,
        });
    }

    public static async signin(payload: IResponderSigninPayload) {
        const [code, data] = await ResponderHttps.query({
            service: account.login,
            body: payload,
        });

        if (code === 0) ResponderHttps.token = data.token;

        return [code, data];
    }

    public static async update(payload: Partial<IResponder>) {
        return ResponderHttps.query({
            service: account.update,
            body: payload,
        });
    }

    public static async export(formats: Array<"pdf" | "csv">) {
        return ResponderHttps.query({
            service: account.update,
            buildPath: (path) => path.concat(`?formats=${formats.join(",")}`),
        });
    }

    public static async resetPassword(email: string) {
        return ResponderHttps.query({
            service: account.resetPassword,
            body: { email },
        });
    }

    public static async changePassword(payload: { oldPassword: string; newPassword: string }) {
        return ResponderHttps.query({
            service: account.changePassword,
            body: payload,
        });
    }
}
