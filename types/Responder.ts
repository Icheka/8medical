import { IUser } from "./user";

export interface IResponder extends IUser {
    phone: string;
}

export interface IResponderSignupPayload {
    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    password: string;
    phone: string;
}

export interface IResponderSigninPayload {
    email: string;
    password: string;
}
