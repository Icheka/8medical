import { AdminHttps } from "../../config/https";
import { IAdmin, IResponder, IResponderSignupPayload } from "../../types/service-types";
import { SERVICE_PATHS } from "../../types/services";

const services = SERVICE_PATHS.Admin;
const responders = services.responders();

export class AdminRespondersService {
    public static async fetchAll() {
        return AdminHttps.query({
            service: responders.fetchAll,
        });
    }

    public static async create(body: Partial<IResponder> | IResponderSignupPayload) {
        return AdminHttps.query({
            service: responders.create,
            body,
        });
    }

    public static async fetchById(id: string) {
        return AdminHttps.query({
            service: responders.fetchById,
            buildPath: (path) => path.replace("_id_", id),
        });
    }

    public static async updateById(id: string, body: Partial<IResponder>) {
        return AdminHttps.query({
            service: responders.updateById,
            buildPath: (path) => path.replace("_id_", id),
            body,
        });
    }

    public static async deleteById(id: string) {
        return AdminHttps.query({
            service: responders.deleteById,
            buildPath: (path) => path.replace("_id_", id),
        });
    }
}
