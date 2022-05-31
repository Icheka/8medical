import { FunctionComponent } from "react";
import { PrimaryButton, StripedTable } from "../../base";

export const VehiclesTable: FunctionComponent = () => {
    // vars
    const headers = ["Vehicle ID", "Responder", "Type", "Model", "Cost per KM", "Status", ""];
    const rows = [
        ["87653458", "John Doe", "", "Toyota Camry 2017", "N15,000", "Approved"],
        ["87653458", "John Doe", "", "Toyota Camry 2017", "N15,000", "Approved"],
        ["87653458", "John Doe", "", "Toyota Camry 2017", "N15,000", "Approved"],
        ["87653458", "John Doe", "", "Toyota Camry 2017", "N15,000", "Approved"],
        ["87653458", "John Doe", "", "Toyota Camry 2017", "N15,000", "Approved"],
        ["87653458", "John Doe", "", "Toyota Camry 2017", "N15,000", "Approved"],
        ["87653458", "John Doe", "", "Toyota Camry 2017", "N15,000", "Approved"],
        ["87653458", "John Doe", "", "Toyota Camry 2017", "N15,000", "Approved"],
        ["87653458", "John Doe", "", "Toyota Camry 2017", "N15,000", "Approved"],
    ];

    return (
        <div>
            <StripedTable headers={headers} rows={rows} />
            <div className={`mt-3`}>
                <PrimaryButton className={`px-4 py-1`} text={"Add Vehicle"} />
            </div>
        </div>
    );
};
