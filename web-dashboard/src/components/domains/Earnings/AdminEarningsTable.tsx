import { FunctionComponent } from "react";
import { StripedTable } from "../../base";

export const AdminEarningsTable: FunctionComponent = () => {
    // vars
    const headers = ['Enrollee Name', 'Responder Name', 'Location', 'Start Time', 'End Time', 'Type', 'Amount'];
    const rows = [
        ['John Doe', 'Jane Doe', 'Sani Abacha St., Lagos State', '10:20 AM', '11:10 PM', 'Emergency', 'N200,000'],
        ['John Doe', 'Jane Doe', 'Sani Abacha St., Lagos State', '10:20 AM', '11:10 PM', 'Emergency', 'N200,000'],
        ['John Doe', 'Jane Doe', 'Sani Abacha St., Lagos State', '10:20 AM', '11:10 PM', 'Emergency', 'N200,000'],
        ['John Doe', 'Jane Doe', 'Sani Abacha St., Lagos State', '10:20 AM', '11:10 PM', 'Emergency', 'N200,000'],
        ['John Doe', 'Jane Doe', 'Sani Abacha St., Lagos State', '10:20 AM', '11:10 PM', 'Emergency', 'N200,000'],
        ['John Doe', 'Jane Doe', 'Sani Abacha St., Lagos State', '10:20 AM', '11:10 PM', 'Emergency', 'N200,000'],
        ['John Doe', 'Jane Doe', 'Sani Abacha St., Lagos State', '10:20 AM', '11:10 PM', 'Emergency', 'N200,000'],
        ['John Doe', 'Jane Doe', 'Sani Abacha St., Lagos State', '10:20 AM', '11:10 PM', 'Emergency', 'N200,000'],
    ]

    return(
        <div>
            <StripedTable headers={headers} rows={rows} />
        </div>
    )
}