import { UploadedFile } from "./files";
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
    idDocument?: UploadedFile;
    driversLicence?: UploadedFile;
    otherDocuments: Array<UploadedFile>;
    accountVerified: boolean;
    verificationRequestPending: boolean;
    profilePicture?: string;
    verifiedAt?: Date;
    bankName?: string;
    bankAccountName?: string;
    bankAccountNumber?: string;
    dateOfBirth?: Date;
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
