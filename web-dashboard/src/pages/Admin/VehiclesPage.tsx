import { FunctionComponent } from "react";
import { VehiclesTable } from "../../components/domains";
import { Page } from "../../components/layout";

export const VehiclesPage: FunctionComponent = () => {
    return (
        <Page loading={false}>
            <div>
                <VehiclesTable />
            </div>
        </Page>
    );
};
