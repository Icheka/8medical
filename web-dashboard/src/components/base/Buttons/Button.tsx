import { DetailedHTMLProps, FunctionComponent, ReactNode } from "react";

export interface IButton extends DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    text?: string;
    content?: any;
    leftIcon?: ReactNode;
}

export const Button: FunctionComponent<IButton> = ({ children, leftIcon, className, text, content, ...buttonProps }) => {
    return (
        <button className={`flex items-center space-x-2 ${className}`} {...buttonProps}>
            {leftIcon}
            <div>{text ?? content ?? children}</div>
        </button>
    );
};
