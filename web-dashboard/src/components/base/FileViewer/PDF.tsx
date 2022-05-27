import { FunctionComponent, useState } from "react";

// @ts-ignore
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface IPdfDocument {
    url: string;
    showControls?: boolean;
}

export const PdfDocument: FunctionComponent<IPdfDocument> = ({ showControls, url }) => {
    // state
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    // utils
    const onDocumentLoadSuccess = ({ numPages }: any) => {
        setNumPages(numPages);
    };
    const previous = () => {
        if (pageNumber <= 1) return;

        setPageNumber(pageNumber - 1);
    };
    const next = () => {
        if (pageNumber >= (numPages ?? 1)) return;

        setPageNumber(pageNumber + 1);
    };

    return (
        <div className={`relative`}>
            <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
            </Document>
            <div className={`flex justify-center ${!showControls && "hidden"}`}>
                <div className={`w-52 flex justify-between items-center absolute bottom-6`}>
                    <ActionButton onClick={previous}>Prev</ActionButton>
                    <span>
                        {pageNumber} of {numPages}
                    </span>
                    <ActionButton onClick={next}>Next</ActionButton>
                </div>
            </div>
        </div>
    );
};

interface IActionButton {
    onClick: VoidFunction;
    children?: any;
}

const ActionButton: FunctionComponent<IActionButton> = ({ children, onClick }) => {
    return (
        <button onClick={onClick} type={"button"} className={`bg-gray-50 rounded-md px-4 py-1 shadow flex justify-center items-center `}>
            {children}
        </button>
    );
};
