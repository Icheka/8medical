import Joi from "joi";
import { TControllerReturnType } from "../../types";
import Crypt from "../../helpers/crypt";
import SchemaValidator from "../../helpers/joi";
import { BaseModel } from "../../models";
import { EmailLib } from "../../lib/email";

interface IConstructor<T, Y> {
    payload: T;
    validator?: Joi.Schema;
    model: BaseModel<Y>;
    verificationRoute: (id: string) => string;
    email?: {
        payload: Record<string, any>;
        template: string;
    };
    customEmailer?: (account?: T) => void;
    onSignup?: (account?: T) => void;
}

export class SignUpClass<T extends { email: string; password: string; firstName?: string }, Y> {
    payload: T;
    validator?: Joi.Schema;
    model: BaseModel<Y>;
    verificationRoute: (id: string) => string;
    email?: {
        payload: Record<string, any>;
        template: string;
    };
    customEmailer?: (account?: T) => void;
    onSignup?: (account?: T) => void;

    constructor({ payload, model, validator, verificationRoute, customEmailer, email, onSignup }: IConstructor<T, Y>) {
        this.payload = payload;
        this.validator = validator;
        this.model = model;
        this.verificationRoute = verificationRoute;
        this.email = email;
        this.customEmailer = customEmailer;
        this.onSignup = onSignup;

        return this;
    }

    public async signup(): Promise<TControllerReturnType> {
        /*
            1. Validate against schema
            2. Does this user exist?
            3. Hash password 
            4. Save user
            5. Send emails
        */

        const obj = this.payload;
        const { validator, model } = this;

        // 1.
        if (validator !== undefined) {
            const [isValid, error] = SchemaValidator.validate(validator, obj);
            if (!isValid) return { error: error as string };
        }
        obj.email = obj.email.toLowerCase();

        // 2.
        const possibleUser = await model.FetchOneBy({ email: obj.email });
        if (possibleUser.data !== null) return { error: "A user with this email address is already registered? Did you forget your password?" };

        // 3.
        const hash = await Crypt.hash(obj.password);
        if (hash === null) return { error: "A terrible error occurred and Engineering has been notified. Please, try again and email Support if this notice persists." };

        // 4.
        obj.password = hash;
        const user = new model.model(obj);
        user.save();

        // 5.
        const payload = this.email?.payload ?? {
            name: obj.firstName,
            verificationLink: this.verificationRoute(user._id),
        };
        const template = this.email?.template ?? "common/signup.hbs";

        if (this.customEmailer) {
            this.customEmailer();
        } else {
            await EmailLib.sendEmail({
                address: obj.email,
                subject: "Verify your Vest account",
                payload,
                template,
            });
        }
        if (this.onSignup) this.onSignup();

        return { data: "You signed up successfully! An email and a link to verify your account has been sent to the address you provided." };
    }
}
