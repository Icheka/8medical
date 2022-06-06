import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../config";
import { AdminVehiclesService } from "../../../services";
import { IVehicle } from "../../../types/service-types";
import { PaginatedTable, PrimaryButton, StripedTable } from "../../base";

interface IVehiclesTable {
    limitRows?: number;
}

export const VehiclesTable: FunctionComponent<IVehiclesTable> = ({ limitRows }) => {
    // vars
    const navigate = useNavigate();
    const headers = ["Vehicle ID", "Responder", "Type", "Model", "Cost per KM", "Status"];

    // state
    const [rows, setRows] = useState<Array<Array<string | ReactNode>>>([]);
    const [vehicles, setVehicles] = useState<Array<IVehicle>>([]);

    // utils
    const fetchVehicles = async () => {
        const [code, data] = await AdminVehiclesService.fetchAll();
        if (code !== 0) return;

        data.reverse();
        setRows(cleanseVehiclesData(data));
        setVehicles(data);
    };
    const cleanseVehiclesData = (vehicles: Array<IVehicle>) => {
        return vehicles.map((vehicle) => {
            // const color = vehicleStatusColour(vehicle.activityStatus);
            // const [textColor, bgColor] = color;

            return [
                vehicle.registrationPlate,
                `${vehicle.responder?.firstName ?? ''} ${vehicle.responder?.lastName ?? ''}`,
                vehicle.type,
                "",
                vehicle.costPerKm,
                <div>{/* <div className={`${bgColor} ${textColor} border border-red-200 py-1 px-3 rounded-2xl uppercase text-sm !inline-flex`}>{responder.activityStatus}</div> */}</div>,
                // <DeleteButton onClick={() => setDeletionData({ id: responder._id })} loading={deletionData.id === responder._id} />,
            ];
        });
    };

    // hooks
    useEffect(() => {
        fetchVehicles();
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
                keys={vehicles.map((vehicle) => vehicle._id)}
                onRowClick={(id) => navigate(`${routes.admin.vehicles}/details/${id}`)}
                showControls={!limitRows}
            />
        </>
    );
};
