import { ResponderHttps } from "../config/https";
import { SERVICE_PATHS } from "../types/services";

const services = SERVICE_PATHS.Responder;
const missions = services.missions();

export class ResponderMissionsService {
    public static async fetchMissions() {
        return await ResponderHttps.query({
            service: missions.fetchAll,
        });
    }
}
