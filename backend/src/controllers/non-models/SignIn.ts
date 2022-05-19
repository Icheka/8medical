import Joi from "joi";
import { IUser, TControllerReturnType } from "../../types";
import Crypt from "../../helpers/crypt";
import SchemaValidator from "../../helpers/joi";
import { BaseModel, HydratedDocumentType } from "../../models";
import { EmailLib } from "../../lib/email";
import { emailValidationSchema, passwordValidation, phoneValidation } from "../../lib/validations";
import { RequestUserRoles } from "../../middleware/auth";
import AccessTokens from "../../helpers/authTokens";
import { join } from "path";
import { ExpoPushNotifications } from "./PushNotifications";

interface IConstructor<Y> {
    payload: TUserSignInPayload;
    validator?: Joi.Schema;
    model: BaseModel<Y>;
    role: RequestUserRoles;
}

const SignInPayloadSchema = Joi.object({
    email: emailValidationSchema.required(),
    password: passwordValidation.required(),
    expoPushTokens: Joi.array().items(Joi.string()).optional().allow(null),
});

export interface TUserSignInPayload {
    email: string;
    password: string;
    expoPushTokens?: string[];
}

export interface IRequestVerificationLink {
    id?: string;
    email?: string;
    verificationRoute: (id: string) => string;
}

export class SignInClass<Y extends Partial<IUser>> {
    payload: TUserSignInPayload;
    validator: Joi.Schema;
    model: BaseModel<Y>;
    role?: RequestUserRoles;

    constructor({ model, payload, validator = SignInPayloadSchema, role }: IConstructor<Y>) {
        this.payload = payload;
        this.validator = validator;
        this.model = model;
        this.role = role;

        return this;
    }

    public async requestVerificationLink({ id, email, verificationRoute }: IRequestVerificationLink): Promise<TControllerReturnType> {
        if (!id && !email) return { error: "An `id` or an `email` is required!" };

        const user = id ? await this.model.FetchOne(id) : await this.model.FetchOneBy({ email });
        if (user.error) return { error: "No user was found with this information" };
        const data = user.data as HydratedDocumentType<Y>;

        const pushTokens = data!.expoPushTokens ?? [];
        const pn = new ExpoPushNotifications();
        for (const token of pushTokens) {
            pn.addMessageToBatch({
                to: token,
                badge: 1,
                body: `A new verification link has been sent to the email address you are registered with`,
                priority: "high",
                title: "Account verification",
                subtitle: `Verify your Vest account`,
            });
        }
        pn.sendBatch();

        return {
            data: verificationRoute((user.data as HydratedDocumentType<Y>)!.id),
        };
    }

    public async signin(): Promise<TControllerReturnType> {
        /*
            1. validate payload 
            2. does this user exist? 
            3. compare passwords 
            4. create token
        */

        // 1.
        const [isValid, error] = SchemaValidator.validate(this.validator, this.payload);
        if (!isValid) return { error: error as string };
        this.payload.email = this.payload.email.toLowerCase();

        // 2.
        const query = await this.model.FetchOneBy({ email: this.payload.email });
        if (query.data === null) return { error: "An invalid email address or password was provided!" };

        const user: Y = query.data as Y;

        // 3.
        const passwordsMatch = await Crypt.compare(this.payload.password, user.password!);
        if (!passwordsMatch) return { error: "An invalid email address or password was provided!" };

        if (!user.emailVerified)
            return { error: "You need to verify your account first! An email with a verification link was sent to you. You can request a new link if you did not receive it, or if it has expired." };

        // 4.
        const role = this.role;
        if (!role) throw new Error("`role` must be specified in SignInClass::signin()");

        const accessToken = AccessTokens.create({
            _id: user._id!,
            email: user.email!,
            role: role as RequestUserRoles,
        });

        return {
            data: {
                user,
                token: accessToken,
            },
        };
    }
}
