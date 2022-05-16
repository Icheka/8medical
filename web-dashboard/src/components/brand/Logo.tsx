import { FunctionComponent } from "react";
import { IMAGES } from "../../assets/images";

export const Logo: FunctionComponent = () => {
    return (
        <div className={`flex items-center space-x-2`}>
            <img className={`w-10`} src={IMAGES.Logo} alt={"8Medical logo"} />
            <span className={`font-bold text-3xl`}>EightMedical</span>
        </div>
    );
};
