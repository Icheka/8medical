import { IModelDocument } from "./model";

export enum EUserAccountTypes {
    Responder = "responder",
    Admin = "admin",
}

export enum EAccountActivityStatus {
    Active = "active",
    Inactive = "inactive",
    Deleted = "deleted",
    Banned = "banned",
}

export interface IUser extends IModelDocument {
    firstName: string;
    lastName: string;
    middleName?: string;
    activityStatus: EAccountActivityStatus;
    email: string;
    password: string;
    accountType: EUserAccountTypes;
    emailVerified: boolean;
    expoPushTokens: Array<string>;
}
