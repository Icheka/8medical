import { IModelDocument } from "./model";

export enum EEnrolleeStatus {}

export interface IEnrollee extends IModelDocument {
    publicId: string;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    plan?: number;
    status: EEnrolleeStatus;
    dateOfBirth?: Date;
    gender?: "male" | "female";
    bloodGroup?: string;
    otherPhones?: Array<string>;
    otherAddresses?: Array<string>;
    preExistingConditions?: Array<string>;
    profilePicture?: string;
}
