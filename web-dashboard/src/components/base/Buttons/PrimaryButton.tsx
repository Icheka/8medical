import { FunctionComponent } from "react";
import { Button, IButton } from "./Button";

export const PrimaryButton: FunctionComponent<IButton> = ({ className, ...props }) => (
    <Button className={`bg-purple-700 border-2 border-purple-700 rounded-[10px] shadow-2xl text-white hover:bg-purple-500 transition duration-150 cursor-pointer ${className}`} {...props} />
);
