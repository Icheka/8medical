import { FunctionComponent, useState } from "react";
import { Lightbox } from "../base";

import { CommonCloudinaryWidget, ICommonCloudinaryWidget } from "./CommonWidget";

export const GraphicsUploadWidget: FunctionComponent<ICommonCloudinaryWidget> = ({
    url,
    ...props
}) => {
    // state
    const [showPreview, setShowPreview] = useState(false);

    return (
        <div className={`flex gap-x-6 items-center mt-3`}>
            <div
                className={`${!url && "hidden"}`}
                onClick={() => setShowPreview(true)}
                role={"button"}
            >
                {showPreview ? (
                    <Lightbox name={props.name} onClose={() => setShowPreview(false)} />
                ) : (
                    <div
                        className={`w-[60px] outline outline-blue-300 cursor-pointer rounded-sm h-[80px] overflow-hidden flex justify-center items-center`}
                    >
                        <img src={url} className={`object-cover`} />
                    </div>
                )}
            </div>
            <CommonCloudinaryWidget
                sources={[
                    "dropbox",
                    "google_drive",
                    "local",
                    "url",
                    "camera",
                    "image_search",
                    "instagram",
                    "shutterstock",
                    "istock",
                    "unsplash",
                ]}
                resourceType={"raw"}
                buttonText={props.buttonText ?? url ? "Change" : undefined}
                {...props}
            />
        </div>
    );
};
