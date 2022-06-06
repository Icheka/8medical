import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../../config";
import { AdminEnrolleesService } from "../../../services";
import { EEnrolleeStatus, IEnrollee } from "../../../types/service-types";
import { PaginatedTable, PrimaryButton, StripedTable } from "../../base";

interface IEnrolleesTable {
    limitRows?: number;
    hideAddEnrolleeButton?: boolean;
}

export const EnrolleesTable: FunctionComponent<IEnrolleesTable> = ({ limitRows, hideAddEnrolleeButton = false }) => {
    // vars
    const navigate = useNavigate();
    const headers = ["ID", "Name", "Email", "Phone", "Address", "Plan", "Status"];

    // state
    const [rows, setRows] = useState<Array<Array<string | ReactNode>>>([]);
    const [enrollees, setEnrollees] = useState<Array<IEnrollee>>([]);

    // utils
    const fetchEnrollees = async () => {
        const [code, data] = await AdminEnrolleesService.fetchAll();
        if (code !== 0) return;

        data.reverse();
        setRows(cleanseEnrolleesData(data));
        setEnrollees(data);
    };
    const cleanseEnrolleesData = (enrollees: Array<IEnrollee>) => {
        return enrollees.map(({ name, publicId, status, address, email, plan, phone }) => {
            // const color = enrolleeStatusColour(enrollee.activityStatus);
            // const [textColor, bgColor] = color;

            return [
                publicId,
                name,
                email,
                phone,
                address,
                plan,
                <div>{/* <div className={`${bgColor} ${textColor} border border-red-200 py-1 px-3 rounded-2xl uppercase text-sm !inline-flex`}>{responder.activityStatus}</div> */}</div>,
                // <DeleteButton onClick={() => setDeletionData({ id: responder._id })} loading={deletionData.id === responder._id} />,
            ];
        });
    };
    const enrolleeStatusColour = (status: EEnrolleeStatus) => {
        return ["text-green-500", "bg-green-100"];
    };

    // hooks
    useEffect(() => {
        fetchEnrollees();
    }, []);

    return (
        <div className={`space-y-3`}>
            <PaginatedTable
                headers={headers.map((h, i) => (
                    <div key={i} className={`uppercase text-xs text-[#4B5057]`}>
                        {h}
                    </div>
                ))}
                rows={limitRows ? rows.slice(0, limitRows) : rows}
                keys={enrollees.map((enrollee) => enrollee._id)}
                onRowClick={(id) => navigate(`${routes.admin.enrollees}/details/${id}`)}
                showControls={!limitRows}
            />
            {!hideAddEnrolleeButton && (
                <div className={`flex`}>
                    <Link to={"add"}>
                        <PrimaryButton className={`px-3 py-1`} text={"Add Enrollee"} />
                    </Link>
                </div>
            )}
        </div>
    );
};
