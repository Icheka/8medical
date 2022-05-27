import { FunctionComponent, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { toast } from "react-toastify";
import { ResponderAccountService } from "../../services";
import { PrimaryButton } from "../base";

interface IDashboardHeader {
    title?: string;
    hideActionButtons?: boolean;
}

export const DashboardHeader: FunctionComponent<IDashboardHeader> = ({ title = "", hideActionButtons = false }) => {
    // state
    const [profileExport, setProfileExport] = useState({
        pdf: "",
        csv: "",
    });

    // utils
    const handleExportProfile = async () => {
        let pdfLink = null;
        if (profileExport.pdf.length !== 0) {
            pdfLink = profileExport.pdf;
        } else {
            const [code, data] = await ResponderAccountService.export(["pdf"]);
            if (code !== 0) {
                return toast.error("An error occurred. Please, check yout network and try again.");
            }
            setProfileExport(data);
            pdfLink = data.pdf;
        }
        window.open(pdfLink, "_blank");
    };
    return (
        <div className={`flex items-center justify-between mb-5`}>
            <h1 className={`text-[#4F03A4] font-bold text-2xl`}>{title}</h1>
            {!hideActionButtons && (
                <div className={`hidden xl:block`}>
                    <PrimaryButton type={"button"} onClick={handleExportProfile} leftIcon={<AiOutlineDownload color={"white"} />} text={"Download report"} className={`px-4 py-2`} />
                </div>
            )}
        </div>
    );
};
