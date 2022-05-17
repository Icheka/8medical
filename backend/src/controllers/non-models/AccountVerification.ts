import { EmailLib } from "../../lib/email";
import { BaseModel, HydratedDocumentType } from "../../models";
import { EAccountActivityStatus, TControllerReturnType } from "../../types";

interface IEmailVerificationConstructor<T> {
    _id: string;
    model: BaseModel<T>;
    activateAccount?: boolean;
    loginLink: string;
}
export class EmailVerificationClass<T extends { _id: string; emailVerified: boolean }> {
    _id: string;
    model: BaseModel<T>;
    activateAccount: boolean;
    loginLink: string;

    constructor({ _id, model, activateAccount, loginLink }: IEmailVerificationConstructor<T>) {
        this._id = _id;
        this.model = model;
        this.loginLink = loginLink;
        this.activateAccount = activateAccount ?? false;

        return this;
    }

    public async verify(): Promise<TControllerReturnType> {
        // for now, just verify the account
        // in future: add time limits for verification links

        const { _id, model } = this;

        // 1. find account with email
        // 2. is account verified?
        // 3. mark account verified
        // 4. send email

        // 1.
        const user = await model.FetchOne(_id);
        if (user.data === null) return { error: "This user does not exist!" };

        // 2.
        const obj = user.data as T;
        if (obj.emailVerified === true) return { error: "This account has already been verified!" };

        // 3.
        (user.data as any).emailVerified = true;
        if ((user.data as any).activityStatus && this.activateAccount === true) (user.data as any).activityStatus = EAccountActivityStatus.Active;
        (user.data as HydratedDocumentType<T>)!.save();

        // 4.
        await EmailLib.sendEmail({
            address: (user.data as any).email,
            subject: "Your account has been verified!",
            payload: {
                name: (user.data as any).firstName,
                loginLink: this.loginLink,
            },
            template: "common/email_verified.hbs",
        });

        return { data: "Email verification successful!" };
    }
}
