import { ChangePasswordClass, EmailVerificationClass, ForgotPasswordClass, SignInClass, SignUpClass } from "../non-models";
import { BaseModel, HydratedDocumentType, ResponderModel } from "../../models";
import { IResponder, IResponderSigninPayload, IResponderSignupPayload, TControllerReturnType } from "../../types";
import { KEYS } from "../../keys";
import { ResponderValidations } from "./validations";
import { RequestUserRoles } from "../../middleware/auth";

class Responder extends BaseModel<IResponder> {
    // handle 'change password'
    public async ChangePassword({ id, oldPassword, newPassword }: { id: string; oldPassword: string; newPassword: string }): Promise<TControllerReturnType> {
        let s;
        const user = (await this.FetchOne(id)).data as HydratedDocumentType<IResponder>;

        const f = new ChangePasswordClass({
            model: this,
            id,
            newPassword,
            oldPassword,
        });
        return f.go();
    }

    // handle 'forgot password'
    public async ForgotPassword({ id, email }: { id?: string; email?: string }): Promise<TControllerReturnType> {
        let user: HydratedDocumentType<IResponder>;
        if (!id && !email) return { error: "An `id` or `email` is required!" };

        if (id && !email) {
            user = (await this.FetchOne(id)).data as HydratedDocumentType<IResponder>;
            email = user!.email;
        } else {
            user = (await this.FetchOneBy({ email })).data as HydratedDocumentType<IResponder>;
        }

        const f = new ForgotPasswordClass({
            email: email!,
            model: this,
            path: "/responder/account/password",
        });
        return await f.go();
    }

    // verify email
    public async VerifyEmail(_id: string): Promise<TControllerReturnType> {
        const v = new EmailVerificationClass<IResponder>({
            _id,
            model: _Responder,
            activateAccount: true,
            loginLink: `${KEYS().WEBSITE_URL}/responder/account/sign-in`,
        });
        return v.verify().then(async (data) => {
            return data;
        });
    }

    // sign in
    public async SignIn({ payload }: { payload: IResponderSigninPayload }): Promise<TControllerReturnType> {
        const s = new SignInClass<IResponder>({
            model: _Responder,
            payload,
            role: RequestUserRoles.responder,
        });
        const data = await s.signin();
        return data;
    }

    // sign up
    public async SignUp(payload: IResponderSignupPayload): Promise<TControllerReturnType> {
        const s = new SignUpClass<IResponderSignupPayload, IResponder>({
            model: _Responder,
            payload,
            verificationRoute: (id) => `${KEYS().APP_DOMAIN}/api/responder/account/verify/${id}`,
            validator: ResponderValidations.SignUp,
        });
        return s.signup();
    }
    // admin register
    public async AdminRegister(payload: IResponderSignupPayload): Promise<TControllerReturnType> {
        let user: HydratedDocumentType<IResponder> | undefined = undefined;
        const s = new SignUpClass<IResponderSignupPayload, IResponder>({
            model: _Responder,
            payload,
            verificationRoute: (id) => `${KEYS().APP_DOMAIN}/api/responder/account/verify/${id}`,
            validator: ResponderValidations.SignUp,
            onSignup: (account) => (user = account!),
        });
        const result = await s.signup();
        if (result.error) return result;
        return { data: user };
    }
}

export const _Responder = new Responder({
    model: ResponderModel,
    validations: {},
});
