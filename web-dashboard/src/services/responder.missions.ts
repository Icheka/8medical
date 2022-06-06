import { ResponderHttps } from "../config/https";
import { IMission } from "../types/service-types";
import { SERVICE_PATHS } from "../types/services";

const services = SERVICE_PATHS.Responder;
const missions = services.missions();

export class ResponderMissionsService {
    public static async fetchMissions() {
        return await ResponderHttps.query({
            service: missions.fetchAll,
        });
    }

    public static async fetchMissionDetails(id: string) {
        return await ResponderHttps.query({
            service: missions.fetchOne,
            buildPath: (path) => path.replace(":id", id),
        });
    }

    public static async updateMission(id: string, body: Partial<IMission>) {
        return await ResponderHttps.query({
            service: missions.update,
            buildPath: (path) => path.replace(":id", id),
            body,
        });
    }

    public static async accept(id: string) {
        return await ResponderHttps.query({
            service: missions.accept,
            buildPath: (path) => path.replace(":id", id),
        });
    }

    public static async reject(id: string) {
        return await ResponderHttps.query({
            service: missions.reject,
            buildPath: (path) => path.replace(":id", id),
        });
    }

    public static async addNote(id: string, text: string) {
        return await ResponderHttps.query({
            service: missions.addNote,
            buildPath: (path) => path.replace(":id", id),
            body: { text },
        });
    }

    public static async getNote(id: string) {
        return await ResponderHttps.query({
            service: missions.getNote,
            buildPath: (path) => path.replace(":id", id),
        });
    }
}
