import { model, Schema } from "mongoose";
import { EResponderCalendarEventType, IResponderCalendar } from "../../types";

export const ResponderCalendarSchema = new Schema<IResponderCalendar>(
    {
        responderId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            default: "Available for missions",
        },
        start: {
            type: Date,
            required: true,
            default: new Date(),
        },
        end: {
            type: Date,
            required: true,
        },
        type: {
            type: String,
            enum: Object.values(EResponderCalendarEventType),
            required: true,
            default: EResponderCalendarEventType.available,
        },
    },
    {
        timestamps: true,
    }
);

export const ResponderCalendarModel = model("ResponderCalendar", ResponderCalendarSchema);
