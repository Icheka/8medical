import { FunctionComponent } from "react";
import { RespondersTable } from "../../components/domains";
import { AdminDashboardHeader } from "../../components/layout";

export const RespondersPage: FunctionComponent = () => {
    return (
        <div>
            <AdminDashboardHeader title={"Responders"} />
            <RespondersTable />
        </div>
    );
};
