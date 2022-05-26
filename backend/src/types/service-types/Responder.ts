import { IUser } from "./user";

export enum EResponderTypes {
    doctor = "doctor",
    nurse = "nurse",
    paramedic = "paramedic",
    firstResponder = "first responder",
}

export interface IResponder extends IUser {
    phone: string;
    responderTypes?: Array<EResponderTypes>;
    gender?: string;
    address?: string;
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
