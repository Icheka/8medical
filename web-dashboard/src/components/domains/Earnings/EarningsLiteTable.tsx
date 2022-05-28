import { FunctionComponent } from "react";
import { StripedTable } from "../../base";

const rows = [
    ["12/09/2019", "02:00 PM", "₦7500.00"],
    ["12/09/2019", "02:00 PM", "₦7500.00"],
    ["12/09/2019", "02:00 PM", "₦7500.00"],
];

export const EarningsLiteTable: FunctionComponent = () => {
    // vars
    const headers = ["Date", "Time", "Earnings"];

    return (
        <div>
            <StripedTable headers={headers} rows={rows} />
        </div>
    );
};
