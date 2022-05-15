import { FunctionComponent } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { PrimaryButton } from "../base";

interface IDashboardHeader {
    title?: string;
}

export const DashboardHeader: FunctionComponent<IDashboardHeader> = ({ title = "" }) => {
    return (
        <div className={`flex items-center justify-between`}>
            <h1 className={`text-[#4F03A4] font-bold text-2xl`}>{title}</h1>
            <div>
                <PrimaryButton leftIcon={<AiOutlineDownload color={"white"} />} text={"Download report"} className={`px-4 py-2`} />
            </div>
        </div>
    );
};
