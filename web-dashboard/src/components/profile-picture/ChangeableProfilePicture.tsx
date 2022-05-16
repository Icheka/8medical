import { FunctionComponent } from "react";
import { FaCamera } from "react-icons/fa";

export const ChangeableProfilePicture: FunctionComponent = () => {
    return (
        <div className={`flex items-center justify-ccenter p-[6px] bg-gray-300 rounded-full h-[150px] w-[150px]`}>
            <div className={`rounded-full overflow-hidden flex justify-center items-center w-full h-full`}>
                <Fallback />
            </div>
        </div>
    );
};

const Fallback: FunctionComponent = () => {
    return (
        <div className={`flex flex-col items-center justify-center w-full h-full bg-zinc-500 text-center text-white space-y-2`}>
            <div>
                <FaCamera className={`text-2xl`} />
            </div>
            <div className={`px-3 text-sm`}>Click to change photo</div>
        </div>
    );
};
