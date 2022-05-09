import { FunctionComponent } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { PrimaryButton, StripedTable } from "../components/base";

export const RidesPage: FunctionComponent = () => {
    // vars
    const headers = ["Date", "Orders", "Earnings"];

    return (
        <div>
            <div className={`flex items-center justify-between`}>
                <h1 className={`text-[#4F03A4] font-bold text-2xl`}>Rides/Missions</h1>
                <div>
                    <PrimaryButton leftIcon={<AiOutlineDownload color={"white"} />} text={"Download report"} className={`px-4 py-2`} />
                </div>
            </div>
            <div>
                <StripedTable
                    headers={headers.map((h, i) => (
                        <div key={i} className={`uppercase text-xs text-[#4B5057]`}>
                            {h}
                        </div>
                    ))}
                    rows={[]}
                />
            </div>
        </div>
    );
};
