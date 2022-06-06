import { ResponderHttps } from "../config/https";
import { IResponder, IResponderCalendar } from "../types/service-types";
import { SERVICE_PATHS } from "../types/services";

const services = SERVICE_PATHS.Responder;
const calendar = services.calendar();

export class ResponderCalendarService {
    public static async fetchAll() {
        return ResponderHttps.query({
            service: calendar.fetchAll,
        });
    }

    public static async addEvents(events: Array<Partial<IResponderCalendar>>) {
        return ResponderHttps.query({
            service: calendar.addEvents,
            body: {
                events,
            },
        });
    }
   
    public static async updateEvents(events: Array<Partial<IResponderCalendar>>) {
        return ResponderHttps.query({
            service: calendar.updateEvents,
            body: {
                events,
            },
        });
    }
}
