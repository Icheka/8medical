import { FunctionComponent } from "react"

interface IUnderlinedButton {
    text?: string;
    onClick?: VoidFunction;
    children?: any;
}

export const UnderlinedButton: FunctionComponent<IUnderlinedButton> = ({
    text, onClick, children
}) => {
    return(
        <button className={`underline text-[#0054FE]`} onClick={onClick}>
            {text ?? children}
        </button>
    )
}