import { FunctionComponent } from "react";
import { PrimaryButton, StripedTable } from "../../base";

const rows = [
    ["39 Ada George Rd., Port Harcourt", "NiMSA Games 2021", "29 September, 2021", "10:00 AM", "Completed", <PrimaryButton text={"View details"} className={`px-2 text-xs`} />],
    ["39 Ada George Rd., Port Harcourt", "NiMSA Games 2021", "29 September, 2021", "10:00 AM", "Completed", <PrimaryButton text={"View details"} className={`px-2 text-xs`} />],
    ["39 Ada George Rd., Port Harcourt", "NiMSA Games 2021", "29 September, 2021", "10:00 AM", "Completed", <PrimaryButton text={"View details"} className={`px-2 text-xs`} />],
    ["39 Ada George Rd., Port Harcourt", "NiMSA Games 2021", "29 September, 2021", "10:00 AM", "Completed", <PrimaryButton text={"View details"} className={`px-2 text-xs`} />],
    ["39 Ada George Rd., Port Harcourt", "NiMSA Games 2021", "29 September, 2021", "10:00 AM", "Completed", <PrimaryButton text={"View details"} className={`px-2 text-xs`} />],
    ["39 Ada George Rd., Port Harcourt", "NiMSA Games 2021", "29 September, 2021", "10:00 AM", "Completed", <PrimaryButton text={"View details"} className={`px-2 text-xs`} />],
    ["39 Ada George Rd., Port Harcourt", "NiMSA Games 2021", "29 September, 2021", "10:00 AM", "Completed", <PrimaryButton text={"View details"} className={`px-2 text-xs`} />],
    ["39 Ada George Rd., Port Harcourt", "NiMSA Games 2021", "29 September, 2021", "10:00 AM", "Completed", <PrimaryButton text={"View details"} className={`px-2 text-xs`} />],
];

export const RidesTable: FunctionComponent = () => {
    // vars
    const headers = ["Location", "Description", "Date", "Time", "Status", ""];

    return (
        <StripedTable
            headers={headers.map((h, i) => (
                <div key={i} className={`uppercase text-xs text-[#4B5057]`}>
                    {h}
                </div>
            ))}
            rows={rows}
        />
    );
};
