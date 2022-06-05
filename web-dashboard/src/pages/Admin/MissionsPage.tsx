import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../../components/base";
import { AdminMissionsTable } from "../../components/domains";
import { AdminDashboardHeader } from "../../components/layout";

export const MissionsPage: FunctionComponent = () => {
    return (
        <div>
            <AdminDashboardHeader title={"Missions"} />
            <AdminMissionsTable />
            <div className={`flex`}>
                <Link to={"add"}>
                    <PrimaryButton className={`px-3 py-1`} text={"Add Mission"} />
                </Link>
            </div>
        </div>
    );
};
