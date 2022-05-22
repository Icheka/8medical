import { IModelDocument } from "./model";
import { EResponderTypes } from "./Responder";

export enum EMissionStatus {
    scheduled = "scheduled",
    active = "active",
    cancelled = "cancelled",
    completed = "completed",
}

export interface IGeospatialPoint {
    type: "Point";
    coordinates: [number, number];
}

export interface IMissionTeamMember {
    id: string;
    role: EResponderTypes;
}

export enum EMissionType {
    ambulanceStandby = "ambulance standby",
    ambulanceGroundTransport = "ambulance ground transport",
    ambulanceAirTransport = "ambulance air transport",
    emergencyResponse = "emergency response",
}

export interface IResponderPermutations {
    doctors: number;
    nurses: number;
    paramedics: number;
    firstResponders: number;
}

export interface IMission extends IModelDocument {
    startTime: Date;
    endTime?: Date;
    status: EMissionStatus;
    address: string;
    stops: Array<IGeospatialPoint>;
    totalEarning?: number;
    description: string;
    team: Array<IMissionTeamMember>;
    respondersContacted: Array<string>;
    rideType: EMissionType;
    responderPermutations: IResponderPermutations;
}
