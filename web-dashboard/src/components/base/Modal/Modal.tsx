import { FunctionComponent } from "react";
import { FaTimes } from "react-icons/fa";
import PureModal from "react-pure-modal";

export interface IModal {
    header?: string;
    isOpen: boolean;
    onClose: VoidFunction;
    closeButtonPosition?: "header" | "bottom";
    portal?: boolean;
    children?: any;
    width?: string;
    className?: string;
}
export const Modal: FunctionComponent<IModal> = ({ header, width, isOpen, className, onClose, closeButtonPosition = "header", portal = true, children }) => {
    return (
        <PureModal
            className={`!z-50`}
            width={width}
            header={header}
            isOpen={isOpen}
            onClose={onClose}
            closeButton={<FaTimes className={`text-gray-700`} />}
            closeButtonPosition={closeButtonPosition}
            portal={portal}
        >
            <div>{children}</div>
        </PureModal>
    );
};
