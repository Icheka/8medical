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

    // add events
    public async addEvents(payload: Array<Partial<IResponderCalendar>>): Promise<TControllerReturnType> {
        const result = await this.InsertMany(payload.filter((event) => SchemaValidator.validate(ResponderCalendarValidations.addEvent, event)[0]) as Array<IResponderCalendar>);
        console.log(result);
        return { error: !result.inserted ? String(result.error) : undefined, data: result.data };
    }
}

export const _ResponderCalendar = new ResponderCalendar({
    model: ResponderCalendarModel,
    validations: {},
});
