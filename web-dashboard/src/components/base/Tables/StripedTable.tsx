import { FunctionComponent, ReactNode } from "react";

export interface IStripedTable {
    headers: Array<string | ReactNode>;
    rows: Array<Array<string | ReactNode>>;
    keys?: Array<string>;
    onRowClick?: (key: string | number) => void;
}

export const StripedTable: FunctionComponent<IStripedTable> = ({ headers, rows, keys, onRowClick }) => {
    // utils
    const handleRowClick = (key: number | string) => {
        if (!onRowClick) return;
        onRowClick(key);
    };

    return (
        <div className="">
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full py-2 align-middle">
                        <div className="overflow-hidden px-2 shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {headers.map((header, i) => (
                                            <th key={i} scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {rows.map((row, i) => (
                                        <tr key={keys ? keys[i] : i} onClick={() => handleRowClick(keys ? keys[i] : i)} className={`even:bg-gray-50 ${onRowClick && "cursor-pointer"}`}>
                                            {row.map((cell, j) => (
                                                <td key={`${i}-${j}`} className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    {cell}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
