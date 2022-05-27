import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { ResponderMissionsService } from "../../../services";
import { EMissionStatus, IMission } from "../../../types/service-types";
import { StripedTable } from "../../base";

interface IRidesTable {
    limitRows?: number;
}

export const RidesTable: FunctionComponent<IRidesTable> = ({ limitRows }) => {
    // vars
    const headers = ["Location", "Description", "Date", "Time", "Status", ""];

    // state
    const [rows, setRows] = useState<Array<Array<string | ReactNode>>>([]);

    // utils
    const fetchMissions = async () => {
        const [code, data] = await ResponderMissionsService.fetchMissions();
        if (code === 0) setRows(cleanseMissionsData(data));
    };
    const cleanseMissionsData = (missions: Array<IMission>) => {
        return missions.map((mission) => {
            const color = missionStatusColor(mission.status);
            const textColor = "text-".concat(color, "-500");
            const bgColor = "!bg-".concat(color, "-200");

            return [
                <div className={"w-full max-w-[180px] h-full overflow-hidden text-ellipsis"}>{mission.address}</div>,
                mission.description,
                new Date(mission.startTime).toLocaleDateString("en-GB"),
                new Date(mission.startTime).toLocaleTimeString("en-GB", { hour12: true }),
                <div className={`${bgColor} ${textColor} border px-3 py-1 rounded-lg uppercase text-sm`}>{mission.status}</div>,
            ];
        });
    };
    const missionStatusColor = (status: EMissionStatus) => {
        switch (status) {
            case EMissionStatus.active:
                return "blue";
            case EMissionStatus.cancelled:
                return "red";
            case EMissionStatus.completed:
                return "green";
            case EMissionStatus.scheduled:
                return "yellow";
        }
    };

    // hooks
    useEffect(() => {
        fetchMissions();
    }, []);

    return (
        <StripedTable
            headers={headers.map((h, i) => (
                <div key={i} className={`uppercase text-xs text-[#4B5057]`}>
                    {h}
                </div>
            ))}
            rows={limitRows ? rows.slice(0, limitRows) : rows}
        />
    );
};
