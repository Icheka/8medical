import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IStripedTable, StripedTable } from "./StripedTable";

interface IPaginatedTable extends IStripedTable {
    showControls?: boolean;
}

export const PaginatedTable: FunctionComponent<IPaginatedTable> = ({ showControls = true, rows, ...stripedTableProps }) => {
    // vars
    const perPage = 20;

    // state
    const [page, setPage] = useState<{
        page: number;
        rows: Array<Array<string | ReactNode>>;
    }>({
        page: 1,
        rows: [],
    });

    // utils
    const paginateRight = () => {
        const pages = rows.length / perPage;
        if (page.page >= pages) return;
        const newPage = page.page + 1;
        const newIndex = calculateMinIndexForPage(newPage);
        setPage({
            page: newPage,
            rows: rows.slice(newIndex, newIndex + perPage),
        });
    };
    const paginateLeft = () => {
        if (page.page <= 1) return;
        const newPage = page.page - 1;
        const newIndex = calculateMinIndexForPage(newPage);
        setPage({
            page: newPage,
            rows: rows.slice(newIndex, newIndex + perPage),
        });
    };
    const calculateMinIndexForPage = (page: number) => {
        return (page - 1) * perPage;
    };

    // hooks
    useEffect(() => {
        setPage({ page: page.page, rows: rows.slice(calculateMinIndexForPage(page.page), perPage) });
    }, [rows.length]);

    return (
        <div>
            <StripedTable rows={page.rows} {...stripedTableProps} />
            {showControls && (
                <div className={`flex space-x-2 items-center justify-end mt-4`}>
                    <ArrowButton disabled={page.page <= 1} direction={"left"} onClick={paginateLeft} />
                    <PageNumber page={page.page} />
                    <ArrowButton disabled={page.page >= rows.length / perPage} direction={"right"} onClick={paginateRight} />
                </div>
            )}
        </div>
    );
};

interface IPageNumber {
    page: number;
}

const PageNumber: FunctionComponent<IPageNumber> = ({ page }) => {
    return <div className={`bg-purple-600 rounded-lg flex justify-center items-center text-white font-medium w-8 h-8`}>{page}</div>;
};

interface IArrowButton {
    direction: "left" | "right";
    onClick: VoidFunction;
    disabled: boolean;
}

const ArrowButton: FunctionComponent<IArrowButton> = ({ direction, onClick, disabled }) => {
    return (
        <button
            disabled={disabled}
            className={`w-8 h-8 flex justify-center ${
                disabled ? "text-gray-300" : "text-gray-700 hover:bg-purple-100"
            } text-sm items-center bg-white rounded-lg border border-gray-200 transition duration-300`}
            onClick={onClick}
        >
            {direction === "left" ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
    );
};
