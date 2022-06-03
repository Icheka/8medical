import { AdminHttps } from "../../config/https";
import { IAdmin, IAdminSigninPayload, IAdminSignupPayload } from "../../types/service-types";
import { SERVICE_PATHS } from "../../types/services";

const services = SERVICE_PATHS.Admin;
const account = services.account();

export class AdminAccountService {
    public static async whoami(context?: any) {
        const [code, data] = await AdminHttps.query({
            service: account.whoami,
        });

        if (code === 0) {
            if (context && context.setUser) {
                context.setUser(data);
            }
        }

        return [code, data];
    }

    public static async signup(payload: IAdminSignupPayload) {
        return AdminHttps.query({
            service: account.signup,
            body: payload,
        });
    }

    public static async signout() {
        localStorage.clear();
        return AdminHttps.query({
            service: account.signout,
        })
            .then(() => (window.location.href = AdminHttps.signInRoute ?? "/"))
            .catch(() => null);
    }

    public static async signin(payload: IAdminSigninPayload) {
        const [code, data] = await AdminHttps.query({
            service: account.login,
            body: payload,
        });

        if (code === 0) AdminHttps.token = data.token;

        return [code, data];
    }

    public static async update(payload: Partial<IAdmin>) {
        return AdminHttps.query({
            service: account.update,
            body: payload,
        });
    }

    public static async export(formats: Array<"pdf" | "csv">) {
        return AdminHttps.query({
            service: account.export,
            buildPath: (path) => path.concat(`?formats=${formats.join(",")}`),
        });
    }

    public static async resetPassword(email: string) {
        return AdminHttps.query({
            service: account.resetPassword,
            body: { email },
        });
    }

    public static async changePassword(payload: { oldPassword: string; newPassword: string }) {
        return AdminHttps.query({
            service: account.changePassword,
            body: payload,
        });
    }
}
