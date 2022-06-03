import { AdminHttps } from "../../config/https";
import { IVehicle } from "../../types/service-types";
import { SERVICE_PATHS } from "../../types/services";

const services = SERVICE_PATHS.Admin;
const vehicles = services.vehicles();

export class AdminVehiclesService {
    public static async fetchAll() {
        return AdminHttps.query({
            service: vehicles.fetchAll,
        });
    }

    public static async create(body: Partial<IVehicle>) {
        return AdminHttps.query({
            service: vehicles.create,
            body,
        });
    }

    public static async fetchById(id: string) {
        return AdminHttps.query({
            service: vehicles.fetchById,
            buildPath: (path) => path.replace("_id_", id),
        });
    }

    public static async updateById(id: string, body: Partial<IVehicle>) {
        return AdminHttps.query({
            service: vehicles.updateById,
            buildPath: (path) => path.replace("_id_", id),
            body,
        });
    }

    public static async deleteById(id: string) {
        return AdminHttps.query({
            service: vehicles.deleteById,
            buildPath: (path) => path.replace("_id_", id),
        });
    }
}
