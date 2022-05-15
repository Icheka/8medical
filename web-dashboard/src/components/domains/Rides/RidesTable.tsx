import { FunctionComponent } from "react";
import { StripedTable } from "../../base";

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
            rows={[]}
        />
    );
};
