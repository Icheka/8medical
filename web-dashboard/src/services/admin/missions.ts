import { AdminHttps } from "../../config/https";
import { IMission } from "../../types/service-types";
import { SERVICE_PATHS } from "../../types/services";

const services = SERVICE_PATHS.Admin;
const missions = services.missions();

export class AdminMissionsService {
    public static async fetchAll() {
        return AdminHttps.query({
            service: missions.fetchAll,
        });
    }

    public static async fetchById(id: string) {
        return AdminHttps.query({
            service: missions.fetchById,
            buildPath: (path) => path.replace("_id_", id),
        });
    }

    public static async updateById(id: string, body: Partial<IMission>) {
        return AdminHttps.query({
            service: missions.updateById,
            buildPath: (path) => path.replace("_id_", id),
            body,
        });
    }

    public static async create(body: Partial<IMission>) {
        return AdminHttps.query({
            service: missions.create,
            body,
        });
    }
}
