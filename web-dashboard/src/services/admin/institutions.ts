import { AdminHttps } from "../../config/https";
import { IInstitution } from "../../types/service-types";
import { SERVICE_PATHS } from "../../types/services";

const services = SERVICE_PATHS.Admin;
const institutions = services.institutions();

export class AdminInstitutionsService {
    public static async fetchAll() {
        return AdminHttps.query({
            service: institutions.fetchAll,
        });
    }

    public static async fetchById(id: string) {
        return AdminHttps.query({
            service: institutions.fetchById,
            buildPath: (path) => path.replace("_id_", id),
        });
    }

    public static async updateById(id: string, body: Partial<IInstitution>) {
        return AdminHttps.query({
            service: institutions.updateById,
            buildPath: (path) => path.replace("_id_", id),
            body,
        });
    }

    public static async create(body: Partial<IInstitution>) {
        return AdminHttps.query({
            service: institutions.create,
            body,
        });
    }
}
