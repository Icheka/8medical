import { IModelDocument } from "./model";

export enum EInstitutionType {
    hospital = "hospital",
    imaging = "imaging",
    laboratory = "laboratory",
}

export interface IInstitution extends IModelDocument {
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    type: EInstitutionType;
}
