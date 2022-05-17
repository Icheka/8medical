import Crypt from "../../helpers/crypt";
import { EmailLib } from "../../lib/email";
import { ForgotPasswordModel } from "../../models/schemas/ForgotPassword";
import { URL, URLSearchParams } from "url";
import { BaseModel, HydratedDocumentType } from "../../models";
import { TControllerReturnType, IUser } from "../../types";
import { generate as generateRandomString } from "randomstring";

interface IConstructor<T> {
    model: BaseModel<T>;
    email: string;
    path: string;
}

export class ForgotPasswordClass<T extends { _id: string; emailVerified: boolean; email: string; firstName: string }> {
    model: BaseModel<T>;
    email: string;
    path: string;

    constructor({ model, email, path }: IConstructor<T>) {
        this.email = email; //.toLowerCase();
        this.model = model;
        this.path = path;
    }

    public async go(): Promise<TControllerReturnType> {
        // 1. fetch user
        // 2. create link

        const data = await this.model.FetchOneBy({ email: this.email });
        if (data.error) return { error: "No record was found with this email address" };

        const user = data.data as HydratedDocumentType<T>;
        const randomString = generateRandomString({
            readable: false,
            length: 15,
        });
        const validity = new Date(new Date().getTime() + 10 * 60 * 1000);
        const link = `?rs=${randomString}&q=${user?._id}&d=${validity.getTime()}&r=1`;

        new ForgotPasswordModel({
            link,
            email: user!.email,
        }).save();

        const domain = process.env.APP_DOMAIN!;
        const fullLink = `${domain}/api${this.path}${link}`;
        const now = new Date();

        await EmailLib.sendEmail({
            address: user!.email,
            subject: "[Important] Password recovery",
            payload: {
                date: `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`,
                time: `${now.getHours() % 12}:${now.getMinutes()}:${now.getSeconds()} ${now.getHours() >= 12 ? "PM" : "AM"}`,
                link: fullLink,
                vestTeamEmail: "team@getvest.app",
                name: user!.firstName,
            },
            template: "common/password_reset_request.hbs",
        });
        console.log("Password reset link", fullLink);

        return { data: fullLink };
    }

    public static reset<Y extends IUser>({ model, link }: { model: BaseModel<Y>; link: string }): Promise<TControllerReturnType> {
        return ForgotPasswordModel.findOne({ link }).then(async (data) => {
            if (!data || data.isUsed) return { error: "This link has expired or does not exist" };

            // decompose link
            const url = new URLSearchParams(link);
            const rs = url.get("rs");
            const userId = url.get("q")!;
            const validity = url.get("d")!;

            // is this link still valid?
            const now = new Date();
            const then = new Date(validity);

            if (now.getTime() - then.getTime() > 10 * 60 * 1000) return { error: "This link has expired or does not exist" };

            // reset password
            const newPassword = generateRandomString({
                length: 10,
                readable: false,
            });
            const hashed = await Crypt.hash(newPassword);
            if (!hashed) return { error: `An error occurred` };

            const res = await (model as any).UpdateOne(userId, { password: hashed });
            if (res.error) return res;

            data.isUsed = true;
            data.save();

            await EmailLib.sendEmail({
                address: (data as any).email,
                subject: "Your password was changed",
                payload: {
                    name: (data as any).firstName,
                    date: `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`,
                    time: `${now.getHours() % 12}:${now.getMinutes()}:${now.getSeconds()} ${now.getHours() >= 12 ? "PM" : "AM"}`,
                    password: newPassword,
                },
                template: "common/password_reset_successful.hbs",
            });

            console.log("new password", newPassword);

            return { data: "Password reset successful!" };
        });
    }
}
