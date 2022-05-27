import { FunctionComponent } from "react";

// @ts-ignore
import { Widget } from "react-cloudinary-upload-widget";
import { keys } from "../../config";

type TCloudinarySource = "local" | "camera" | "dropbox" | "url" | "image_search" | "facebook" | "instagram" | "shutterstock" | "istock" | "unsplash" | "google_drive";

export interface ICommonCloudinaryWidget {
    sources?: Array<TCloudinarySource>;
    resourceType?: "auto" | "image" | "video" | "raw";
    buttonText?: any;
    multipleUploads?: boolean;
    autoClose?: boolean;
    onSuccess: (res: any) => void;
    onFailure?: (err: any, result: any) => void;
    url?: string;
    name?: string;
    disabled?: boolean;
}

export const CommonCloudinaryWidget: FunctionComponent<ICommonCloudinaryWidget> = ({
    sources = ["camera", "dropbox", "local", "facebook", "google_drive", "image_search", "instagram", "istock", "shutterstock", "unsplash", "url"],
    resourceType = "auto",
    buttonText = "Upload",
    multipleUploads = false,
    autoClose = false,
    onFailure,
    onSuccess,
    name,
    disabled,
}) => {
    return (
        <div className={`relative`}>
            <Widget
                sources={sources}
                resourceType={resourceType}
                cloudName={keys.cloudinary.clouudName}
                uploadPreset={keys.cloudinary.presets.unsigned}
                buttonText={disabled ? "Upload disabled" : buttonText}
                multiple={multipleUploads}
                autoClose={autoClose}
                onSuccess={onSuccess}
                onFailure={onFailure}
                style={{
                    color: "white",
                    border: "none",
                    backgroundColor: "skyblue",
                    borderRadius: 5,
                    width: 120,
                    height: 30,
                }}
            />

            <div className={` ${!disabled && "hidden"} absolute w-full h-full bg-gray-50 opacity-30 top-0 left-0`}>&nbsp;</div>
        </div>
    );
};
