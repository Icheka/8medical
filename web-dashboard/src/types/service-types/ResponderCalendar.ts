import { IModelDocument } from "./model";

export enum EResponderCalendarEventType {
    unavailable = "unavailable",
    available = "available",
    mission = "mission",
}

export interface IResponderCalendar extends IModelDocument {
    type: EResponderCalendarEventType;
    start: Date;
    end: Date;
    title: string;
    responderId: string;
}
