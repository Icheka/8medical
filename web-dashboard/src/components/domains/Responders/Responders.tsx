import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { routes } from "../../../config";
import { AdminRespondersService } from "../../../services";
import { EAccountActivityStatus, IResponder } from "../../../types/service-types";
import { Modal, PaginatedTable, PrimaryButton } from "../../base";

interface IRespondersTable {
    limitRows?: number;
}
interface IDeletionData {
    id: string | null;
}
const defaultDeletionData: IDeletionData = {
    id: null,
};

export const RespondersTable: FunctionComponent<IRespondersTable> = ({ limitRows }) => {
    // vars
    const navigate = useNavigate();
    const headers = ["Name", "Email", "Phone", "Address", "Status"];

    // state
    const [rows, setRows] = useState<Array<Array<string | ReactNode>>>([]);
    const [responders, setResponders] = useState<Array<IResponder>>([]);
    const [deletionData, setDeletionData] = useState<IDeletionData>(defaultDeletionData);

    // utils
    const fetchResponders = async () => {
        const [code, data] = await AdminRespondersService.fetchAll();
        if (code !== 0) return;

        setRows(cleanseRespondersData(data));
        setResponders(data);
    };
    const cleanseRespondersData = (responders: Array<IResponder>) => {
        return responders.map((responder) => {
            const color = responderStatusColour(responder.activityStatus);
            const [textColor, bgColor] = color;

            return [
                `${responder.firstName} ${responder.lastName}`,
                responder.email,
                responder.phone,
                <div className={"w-full max-w-[180px] h-full overflow-hidden text-ellipsis"}>{responder.address}</div>,
                <div>
                    <div className={`${bgColor} ${textColor} border border-red-200 py-1 px-3 rounded-2xl uppercase text-sm !inline-flex`}>{responder.activityStatus}</div>
                </div>,
                // <DeleteButton onClick={() => setDeletionData({ id: responder._id })} loading={deletionData.id === responder._id} />,
            ];
        });
    };
    const responderStatusColour = (status: EAccountActivityStatus) => {
        switch (status) {
            case EAccountActivityStatus.Active:
                return ["text-green-500", "bg-green-100"];
            case EAccountActivityStatus.Banned:
                return ["text-red-500", "bg-red-100"];
            case EAccountActivityStatus.Deleted:
                return ["text-red-500", "bg-red-100"];
            case EAccountActivityStatus.Inactive:
                return ["text-yellow-500", "bg-yellow-100"];
        }
    };
    const deleteResponder = async () => {
        if (!deletionData.id) return;
        const id = deletionData.id;
        setDeletionData(defaultDeletionData);

        AdminRespondersService.deleteById(id)
            .then(([code, data]) => {
                if (code !== 0) return toast.error(data);
                toast(`Responder deleted successfully!`);
            })
            .catch((err) => toast.error(err));
    };
    const findById = (id: string) => responders.find((responder) => responder._id === id);

    // hooks
    useEffect(() => {
        fetchResponders();
    }, []);

    return (
        <>
            <PaginatedTable
                headers={headers.map((h, i) => (
                    <div key={i} className={`uppercase text-xs text-[#4B5057]`}>
                        {h}
                    </div>
                ))}
                rows={limitRows ? rows.slice(0, limitRows) : rows}
                keys={responders.map((responder) => responder._id)}
                onRowClick={(id) => navigate(`${routes.admin.responders}/details/${id}`)}
                showControls={!limitRows}
            />
            <Modal isOpen={deletionData.id !== null} onClose={() => setDeletionData(defaultDeletionData)}>
                <div>
                    <div>
                        <div className={`font-medium`}>
                            Are you sure you want to delete {findById(deletionData.id!)?.firstName} {findById(deletionData.id!)?.lastName}?
                        </div>
                        <div className={`text-sm text-gray-500`}>This action is irreversible!</div>
                    </div>
                    <div className={`flex items-center justify-between mt-4 space-x-4`}>
                        <PrimaryButton onClick={deleteResponder} className={`w-full flex items-center justify-center py-1`} text={"Delete"} />
                        <PrimaryButton
                            onClick={() => setDeletionData(defaultDeletionData)}
                            className={`w-full flex items-center justify-center py-1 !bg-red-500 hover:!bg-red-400 border-red-500 hover:border-red-400`}
                            text={"Cancel"}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
};
