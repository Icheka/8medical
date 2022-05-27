import { FunctionComponent, useState } from "react";
import { PdfDocument } from "../base/FileViewer";

import { CommonCloudinaryWidget, ICommonCloudinaryWidget } from "./CommonWidget";

export const FileUploadWidget: FunctionComponent<ICommonCloudinaryWidget> = ({ url, ...props }) => {
    // state
    const [expand, setExpand] = useState(false);

    return (
        <div className={`flex items-center gap-x-6 mt-0`}>
            <div
                className={`outline outline-blue-300 cursor-pointer rounded-sm flex relative items-center justify-center ${!url && "hidden"} ${expand ? "" : "w-[60px] h-[80px] mt-2"}`}
                onClick={() => !expand && setExpand(true)}
                role={"button"}
            >
                <button className={`absolute z-20 text-xs font-light text-blue-600 underline top-3 right-3 ${!expand && "hidden"}`} onClick={() => setExpand(false)}>
                    Minimize
                </button>
                <PdfDocument url={url ?? ""} showControls={expand} />
            </div>

            <CommonCloudinaryWidget sources={["dropbox", "google_drive", "local", "url"]} resourceType={"raw"} {...props} />
        </div>
    );
};
