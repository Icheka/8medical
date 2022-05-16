import { FunctionComponent } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { PrimaryButton } from "../base";

interface IDashboardHeader {
    title?: string;
    hideActionButtons?: boolean;
}

export const DashboardHeader: FunctionComponent<IDashboardHeader> = ({ title = "", hideActionButtons = false }) => {
    return (
        <div className={`flex items-center justify-between mb-5`}>
            <h1 className={`text-[#4F03A4] font-bold text-2xl`}>{title}</h1>
            {!hideActionButtons && (
                <div className={`hidden xl:block`}>
                    <PrimaryButton leftIcon={<AiOutlineDownload color={"white"} />} text={"Download report"} className={`px-4 py-2`} />
                </div>
            )}
        </div>
    );
};
