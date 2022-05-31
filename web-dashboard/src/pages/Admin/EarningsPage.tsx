import { FunctionComponent } from "react";
import { AdminEarningsTable } from "../../components/domains";
import { AdminDashboardHeader, Page } from "../../components/layout";

export const EarningsPage: FunctionComponent = () => {
    return (
        <Page loading={false}>
            <div>
                <AdminDashboardHeader title="Earnings" />
                <AdminEarningsTable />
            </div>
        </Page>
    );
};
