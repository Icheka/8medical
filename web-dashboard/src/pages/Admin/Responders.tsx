import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../../components/base";
import { RespondersTable } from "../../components/domains";
import { AdminDashboardHeader } from "../../components/layout";
import { routes } from "../../config";

export const RespondersPage: FunctionComponent = () => {
    return (
        <div>
            <AdminDashboardHeader hideActionButtons title={"Responders"} />
            <RespondersTable />
            <div className={`mt-5`}>
                <Link to={routes.admin.responders + "/add"}>
                    <PrimaryButton className={`px-5 py-1`} text={"Add Responder"} />
                </Link>
            </div>
        </div>
    );
};
