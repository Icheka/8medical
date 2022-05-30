import { FunctionComponent } from "react";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { PrimaryButton, StripedTable } from "../../base";

interface IEnrolleesTable {
    limitRows?: number;
}

export const EnrolleesTable: FunctionComponent<IEnrolleesTable> = ({ limitRows }) => {
    // vars
    const navigate = useNavigate();
    const headers = ["ID", "Name", "Email", "Phone", "Address", "Plan", "Status", ""];
    const rows = [
        ["8MD9282", "Mr John Doe", "johndoe@test.com", "+234762782822", "Lorem ipsum dolor", "N12,000", "Status", <FaTrash />],
        ["8MD9282", "Mr John Doe", "johndoe@test.com", "+234762782822", "Lorem ipsum dolor", "N12,000", "Status", <FaTrash />],
        ["8MD9282", "Mr John Doe", "johndoe@test.com", "+234762782822", "Lorem ipsum dolor", "N12,000", "Status", <FaTrash />],
        ["8MD9282", "Mr John Doe", "johndoe@test.com", "+234762782822", "Lorem ipsum dolor", "N12,000", "Status", <FaTrash />],
        ["8MD9282", "Mr John Doe", "johndoe@test.com", "+234762782822", "Lorem ipsum dolor", "N12,000", "Status", <FaTrash />],
    ];

    return (
        <div className={`space-y-3`}>
            <StripedTable headers={headers} rows={limitRows ? rows.slice(0, limitRows) : rows} onRowClick={() => navigate("details/1")} />
            <div className={`flex justify-end`}>
                <Link to={"add"}>
                    <PrimaryButton className={`px-3 py-1`} text={"Add Enrollee"} />
                </Link>
            </div>
        </div>
    );
};
