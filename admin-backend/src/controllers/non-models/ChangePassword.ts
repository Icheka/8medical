import Crypt from "../../helpers/crypt";
import { EmailLib } from "../../lib/email";
import { BaseModel, HydratedDocumentType } from "../../models";
import { IUser, TControllerReturnType, UserType } from "../../types";
import { ExpoPushNotifications } from "./PushNotifications";

interface IConstructor<T> {
    model: BaseModel<T>;
    id: string;
    oldPassword: string;
    newPassword: string;
}

export class ChangePasswordClass<T extends UserType> {
    model: BaseModel<T>;
    id: string;
    oldPassword: string;
    newPassword: string;

    constructor({ model, id, newPassword, oldPassword }: IConstructor<T>) {
        this.id = id;
        this.model = model;
        this.newPassword = newPassword;
        this.oldPassword = oldPassword;
    }

    public async go(): Promise<TControllerReturnType> {
        // 1. fetch user
        // 2. do passwords match?
        // 3. change password

        // 1.
        const data = await this.model.FetchOne(this.id);
        if (data.error) return data;

        const user = data.data as HydratedDocumentType<T>;

        // 2.
        const isMatch = await Crypt.compare(this.oldPassword, user!.password);
        if (!isMatch) return { error: `Old password is incorrect` };

        const hashed = await Crypt.hash(this.newPassword);
        if (!hashed) return { error: "An error occurred" };

        user!.password = hashed;
        user!.save();

        const now = new Date();

        await EmailLib.sendEmail({
            address: user!.email,
            subject: "Your password was changed",
            payload: {
                name: user!.firstName,
                date: `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`,
                time: `${now.getHours() % 12}:${now.getMinutes()}:${now.getSeconds()} ${now.getHours() >= 12 ? "PM" : "AM"}`,
            },
            template: "common/password_changed.hbs",
        });

        return { data: `Your password was changed successfully!` };
    }
}
