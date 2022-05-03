import { FunctionComponent, ReactNode } from "react";
import { IComponent } from "../../../types/ui";

export interface ICard extends IComponent {
    background?: string;
    useDefaultPadding?: boolean;
}

export const Card: FunctionComponent<ICard> = ({ background = "bg-white", children, className, style, useDefaultPadding }) => {
    const classes = Array.isArray(className) ? className.join(" ") : className;

    return (
        <div className={`${background} overflow-hidden border border-[#e2e8ef] rounded-md shadow-md h-full w-full ${useDefaultPadding && "p-2"} ${classes}`} style={style}>
            {children}
        </div>
    );
};
