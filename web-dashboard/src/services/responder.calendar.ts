import { ResponderHttps } from "../config/https";
import { IResponder } from "../types/service-types";
import { SERVICE_PATHS } from "../types/services";

const services = SERVICE_PATHS.Responder;
const calendar = services.calendar();

export class ResponderCalendarService {
    public static async fetchAll() {
        return ResponderHttps.query({
            service: calendar.fetchAll,
        });
    }
}
