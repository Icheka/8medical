import { FunctionComponent, ReactNode } from "react";

interface IPurpleLink {
    href?: string;
    text?: string;
    blank?: boolean;
    children?: any;
}

export const PurpleLink: FunctionComponent<IPurpleLink> = ({ href = "#", text, blank, children }) => {
    // vars
    const target: React.HTMLAttributeAnchorTarget = blank ? "_blank" : "_self";
    return (
        <a className={`text-[#100DB1] underline`} href={href} target={target}>
            {text ?? children}
        </a>
    );
};
