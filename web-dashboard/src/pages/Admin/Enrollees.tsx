import { FunctionComponent } from "react";
import { EnrolleesTable } from "../../components/domains";
import { AdminDashboardHeader } from "../../components/layout";

export const EnrolleesPage: FunctionComponent = () => {
    return (
        <div>
            <AdminDashboardHeader title={"Enrollees"} />
            <EnrolleesTable />
        </div>
    );
};
