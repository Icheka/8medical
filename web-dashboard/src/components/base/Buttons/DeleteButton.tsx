import { FunctionComponent } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Loading from "react-loading";

interface IDeleteButton {
    onClick: VoidFunction;
    loading?: boolean;
}

export const DeleteButton: FunctionComponent<IDeleteButton> = ({ onClick, loading }) => (loading ? <Loading type="spin" className={`w-4 h-4`} /> : <FaTrashAlt onClick={onClick} />);
