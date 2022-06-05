import { capitalize } from "capitalization";
import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../../config";
import { AdminMissionsService } from "../../../services";
import { EMissionStatus, IMission } from "../../../types/service-types";
import { PaginatedTable, PrimaryButton } from "../../base";

interface IMissionsTable {
    limitRows?: number;
}

export const AdminMissionsTable: FunctionComponent<IMissionsTable> = ({ limitRows }) => {
    // vars
    const navigate = useNavigate();
    const headers = ["Enrollee", "Type", "Location", "Description", "Time", "Bill", "Status"];

    // state
    const [rows, setRows] = useState<Array<Array<string | ReactNode>>>([]);
    const [missions, setMissions] = useState<Array<IMission>>([]);

    // utils
    const fetchMissions = async () => {
        const [code, data] = await AdminMissionsService.fetchAll();
        if (code !== 0) return;

        setRows(cleanseMissionsData(data));
        setMissions(data);
    };
    const cleanseMissionsData = (missions: Array<IMission>) => {
        return missions.map(({ address, rideType, startTime, description, status, totalEarning, endTime }) => {
            return [
                "",
                capitalize(rideType),
                <div className={`text-ellipsis overflow-hidden w-64`}>{address}</div>,
                <div className={`text-ellipsis overflow-hidden w-48`}>{description}</div>,
                new Date(startTime).toLocaleString("en-GB"),
                "₦" + totalEarning,
                status,
            ];
        });
    };
    const missionStatusColour = (status: EMissionStatus) => {
        return ["text-green-500", "bg-green-100"];
    };

    // hooks
    useEffect(() => {
        fetchMissions();
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
                keys={missions.map((mission) => mission._id)}
                onRowClick={(id) => navigate(`${routes.admin.missions}/details/${id}`)}
                showControls={!limitRows}
            />
        </div>
    );
};
