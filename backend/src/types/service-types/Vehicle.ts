import { IModelDocument } from "./model";

export enum EVehicleType {
    ambulance = "ambulance",
    cycle = "cycle",
}

export interface IVehicle extends IModelDocument {
    registrationPlate: string;
    assignedTo?: string;
    type: EVehicleType;
    costPerKm?: number;
    status: string;
}
