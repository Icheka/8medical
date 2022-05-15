import { FunctionComponent } from "react";
import { Button, IButton } from "./Button";

export const OutlineButton: FunctionComponent<IButton> = ({ className, ...props }) => (
    <Button className={`bg-white rounded-[10px] text-purple-700 border-2 border-purple-700 hover:bg-purple-500 hover:text-white transition duration-150 cursor-pointer ${className}`} {...props} />
);
