import { FunctionComponent } from "react";
import { FaCamera } from "react-icons/fa";

interface IChangeableProfilePicture {
    size?: string;
}

export const ChangeableProfilePicture: FunctionComponent<IChangeableProfilePicture> = ({ size = "h-[100px] xl:h-[150px] w-[100px] xl:w-[150px]" }) => {
    return (
        <div className={`flex items-center justify-center p-[6px] bg-gray-300 rounded-full ${size}`}>
            <div className={`rounded-full overflow-hidden flex justify-center items-center w-full h-full`}>
                <Fallback />
            </div>
        </div>
    );
};

const Fallback: FunctionComponent = () => {
    return (
        <div className={`flex flex-col items-center justify-center w-full h-full bg-zinc-500 text-center text-white space-y-1 xl:space-y-2`}>
            <div>
                <FaCamera className={`text-xl xl:text-2xl`} />
            </div>
            <div className={`px-3 text-sm hidden xl:block`}>Click to change photo</div>
            <div className={`px-3 xl:hidden text-xs`}>Change photo</div>
        </div>
    );
};
