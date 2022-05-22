import joi from "joi";
import { EResponderCalendarEventType } from "../../types";

export const ResponderCalendarValidations = {
    addEvent: joi.object({
        responderId: joi.string().required(),
        title: joi.string().optional(),
        start: joi.date().optional(),
        end: joi.date().required(),
        type: joi
            .string()
            .required()
            .valid(...Object.values(EResponderCalendarEventType)),
    }),
};
