import { IUser } from "./user";

export interface IAdmin extends IUser {}

export interface IAdminSigninPayload {
    email: string;
    password: string;
}

export interface IAdminSignupPayload {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    middleName?: string;
}
