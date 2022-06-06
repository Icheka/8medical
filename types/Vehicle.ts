import { IModelDocument } from "./model";
import { IResponder } from "./Responder";

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
    responder?: IResponder;
}
