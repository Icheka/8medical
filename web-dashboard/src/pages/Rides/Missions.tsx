import { FunctionComponent } from "react";
import { DateFilter } from "../../components/base/DateFilter";
import { RidesTable } from "../../components/domains";
import { DashboardHeader } from "../../components/layout";

export const RidesPage: FunctionComponent = () => {
    return (
        <div>
            <DashboardHeader title={"Missions"} />
            <div>
                <RidesTable />
            </div>
        </div>
    );
};
