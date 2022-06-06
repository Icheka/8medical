import { AdminHttps } from "../../config/https";
import { SERVICE_PATHS } from "../../types/services";

const services = SERVICE_PATHS.Admin;
const site = services.site();

export class AdminSiteService {
    public static async siteStatistics() {
        return AdminHttps.query({
            service: site.siteStatistics,
        });
    }

    public static async rideStatistics() {
        return AdminHttps.query({
            service: site.rideStatistics,
        });
    }
}
