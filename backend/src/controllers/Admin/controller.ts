import { ChangePasswordClass, EmailVerificationClass, ForgotPasswordClass, SignInClass, SignUpClass } from "../non-models";
import { AdminModel, BaseModel, HydratedDocumentType, ResponderModel } from "../../models";
import { IAdmin, TControllerReturnType, IAdminSignupPayload, IAdminSigninPayload } from "../../types";
import { KEYS } from "../../keys";
import { RequestUserRoles } from "../../middleware/auth";

class Admin extends BaseModel<IAdmin> {
    // handle 'change password'
    public async ChangePassword({ id, oldPassword, newPassword }: { id: string; oldPassword: string; newPassword: string }): Promise<TControllerReturnType> {
        let s;
        const user = (await this.FetchOne(id)).data as HydratedDocumentType<IAdmin>;

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
        let user: HydratedDocumentType<IAdmin>;
        if (!id && !email) return { error: "An `id` or `email` is required!" };

        if (id && !email) {
            user = (await this.FetchOne(id)).data as HydratedDocumentType<IAdmin>;
            email = user!.email;
        } else {
            user = (await this.FetchOneBy({ email })).data as HydratedDocumentType<IAdmin>;
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
        const v = new EmailVerificationClass<IAdmin>({
            _id,
            model: _Admin,
            activateAccount: true,
            loginLink: `${KEYS().WEBSITE_URL}/admin/account/sign-in`,
        });
        return v.verify().then(async (data) => {
            return data;
        });
    }

    // sign in
    public async SignIn({ payload }: { payload: IAdminSigninPayload }): Promise<TControllerReturnType> {
        const s = new SignInClass<IAdmin>({
            model: _Admin,
            payload,
            role: RequestUserRoles.admin,
        });
        const data = await s.signin();
        return data;
    }

    // sign up
    public async SignUp(payload: IAdminSignupPayload): Promise<TControllerReturnType> {
        const s = new SignUpClass<IAdminSignupPayload, IAdmin>({
            model: _Admin,
            payload,
            verificationRoute: (id) => `${KEYS().APP_DOMAIN}/api/admin/account/verify/${id}`,
        });
        return s.signup();
    }
}

export const _Admin = new Admin({
    model: AdminModel,
    validations: {},
});
