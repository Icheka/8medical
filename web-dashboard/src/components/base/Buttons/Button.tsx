import { DetailedHTMLProps, FunctionComponent, ReactNode } from "react";
import ReactLoading from "react-loading";

export interface IButton extends DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    text?: string;
    content?: any;
    leftIcon?: ReactNode;
    loading?: boolean;
    loadingIconColor?: string;
}

export const Button: FunctionComponent<IButton> = ({ children, leftIcon, loading, loadingIconColor, className, text, content, ...buttonProps }) => {
    return (
        <button className={`flex items-center space-x-2 ${className}`} {...buttonProps} disabled={buttonProps.disabled || loading}>
            {loading ? (
                <Loading color={loadingIconColor} />
            ) : (
                <>
                    {leftIcon}
                    <div>{text ?? content ?? children}</div>
                </>
            )}
        </button>
    );
};

const Loading: FunctionComponent<{ color?: string }> = ({ color = "white" }) => {
    return <ReactLoading type={"spin"} color={color} height={24} width={24} />;
};
