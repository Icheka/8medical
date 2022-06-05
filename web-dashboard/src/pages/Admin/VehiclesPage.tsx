import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../../components/base";
import { VehiclesTable } from "../../components/domains";
import { AdminDashboardHeader, Page } from "../../components/layout";
import { routes } from "../../config";

export const VehiclesPage: FunctionComponent = () => {
    return (
        <Page loading={false}>
            <div>
                <AdminDashboardHeader title={"Vehicles"} hideActionButtons />
                <VehiclesTable />
                <div className={`mt-5`}>
                    <Link to={routes.admin.vehicles + "/add"}>
                        <PrimaryButton className={`px-5 py-1`} text={"Add Vehicle"} />
                    </Link>
                </div>
            </div>
        </Page>
    );
};
