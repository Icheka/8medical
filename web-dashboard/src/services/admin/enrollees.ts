import { AdminHttps } from "../../config/https";
import { IEnrollee } from "../../types/service-types";
import { SERVICE_PATHS } from "../../types/services";

const services = SERVICE_PATHS.Admin;
const enrollees = services.enrollees();

export class AdminEnrolleesService {
    public static async fetchAll() {
        return AdminHttps.query({
            service: enrollees.fetchAll,
        });
    }

    public static async fetchById(id: string) {
        return AdminHttps.query({
            service: enrollees.fetchById,
            buildPath: (path) => path.replace("_id_", id),
        });
    }

    public static async updateById(id: string, body: Partial<IEnrollee>) {
        return AdminHttps.query({
            service: enrollees.updateById,
            buildPath: (path) => path.replace("_id_", id),
            body,
        });
    }

    public static async create(body: Partial<IEnrollee>) {
        return AdminHttps.query({
            service: enrollees.create,
            body,
        });
    }
}
