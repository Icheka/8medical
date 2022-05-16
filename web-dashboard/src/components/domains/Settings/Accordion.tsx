import { FunctionComponent, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface ISettingsPageAccordion {
    children?: any;
    label?: string;
    isOpen?: boolean;
}

export const SettingsPageAccordion: FunctionComponent<ISettingsPageAccordion> = ({ children, label, isOpen = false }) => {
    // state
    const [open, setOpen] = useState(isOpen);

    return (
        <div className={`relative bg-white z-10`}>
            <button className={`w-full flex items-center justify-center h-16 bg-white ${!open && "border-bs"}`} onClick={() => setOpen(!open)}>
                <div className={`w-full max-w-[400px] flex items-center justify-between`}>
                    <div className={`text-[#100DB1] text-sm font-semibold`}>{label}</div>
                    <div>{open ? <FaChevronUp className={`text-xs text-gray-500`} /> : <FaChevronDown className={`text-xs text-gray-500`} />}</div>
                </div>
            </button>
            <div className={`${open ? "relative" : "hidden"} top-4 bg-white pb-10 transition duration-200 w-full left-0`}>{children}</div>
        </div>
    );
};
