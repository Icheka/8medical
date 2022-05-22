import SchemaValidator from "../../helpers/joi";
import { BaseModel, ResponderCalendarModel } from "../../models";
import { IResponderCalendar, TControllerReturnType } from "../../types";
import { ResponderCalendarValidations } from "./validations";

export class ResponderCalendar extends BaseModel<IResponderCalendar> {
    // add event
    public async addEvent(payload: Partial<IResponderCalendar>): Promise<TControllerReturnType> {
        const [isValid, error] = SchemaValidator.validate(ResponderCalendarValidations.addEvent, payload);
        if (!isValid) return { error: String(error) };

        const event = await this.InsertOne(payload);
        return { error: event.error ? String(event.error) : undefined, data: event.data };
    }
}

export const _ResponderCalendar = new ResponderCalendar({
    model: ResponderCalendarModel,
    validations: {},
});
