import { FunctionComponent } from "react";
import { FaTrash } from "react-icons/fa";
import { StripedTable } from "../../base";

interface IRespondersTable {
    limitRows?: number;
}

export const RespondersTable: FunctionComponent<IRespondersTable> = ({ limitRows }) => {
    // vars
    const headers = ["Name", "Email", "Phone", "Address", "Status", ""];
    const rows = [
        ["Mr John Doe", "johndoe@test.com", "+22386383782", "Completed", <FaTrash />],
        ["Mr John Doe", "johndoe@test.com", "+22386383782", "Completed", <FaTrash />],
        ["Mr John Doe", "johndoe@test.com", "+22386383782", "Completed", <FaTrash />],
        ["Mr John Doe", "johndoe@test.com", "+22386383782", "Completed", <FaTrash />],
        ["Mr John Doe", "johndoe@test.com", "+22386383782", "Completed", <FaTrash />],
        ["Mr John Doe", "johndoe@test.com", "+22386383782", "Completed", <FaTrash />],
        ["Mr John Doe", "johndoe@test.com", "+22386383782", "Completed", <FaTrash />],
        ["Mr John Doe", "johndoe@test.com", "+22386383782", "Completed", <FaTrash />],
        ["Mr John Doe", "johndoe@test.com", "+22386383782", "Completed", <FaTrash />],
    ];

    return <StripedTable headers={headers} rows={limitRows ? rows.slice(0, limitRows) : rows} />;
};
