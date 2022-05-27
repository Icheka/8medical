import { FunctionComponent, useState } from "react";

import { useField } from "formik";

// @ts-ignore
import { Lightbox as LB } from "react-modal-image";

export interface ILightbox {
    medium?: string;
    large?: string;
    small?: string;
    url?: string;
    hideDownload?: boolean;
    hideZoom?: boolean;
    showRotate?: boolean;
    imageBackgroundColor?: string;
    className?: string;
    alt?: string;
    name?: string;
    onClose: VoidFunction;
    children?: any;
}

export const Lightbox: FunctionComponent<ILightbox> = ({
    children,
    onClose,
    className,
    alt = "",
    hideDownload = true,
    hideZoom = true,
    imageBackgroundColor,
    large,
    medium,
    showRotate = true,
    small,
    url,
    name,
}) => {
    // vars
    let field, meta, helpers;
    try {
        [field, meta, helpers] = useField({ name: name ?? "" });
        console.log(field.value, name, meta.value);
    } catch (e) {}
    url = url ?? field?.value ?? meta?.value;
    large = large ?? url;
    medium = medium ?? url;
    small = small ?? url;

    return (
        <LB
            medium={medium}
            large={large}
            small={small}
            hideDownload={hideDownload}
            hideZoom={hideZoom}
            showRotate={showRotate}
            imageBackgroundColor={imageBackgroundColor}
            className={className}
            alt={alt}
            onClose={onClose}
        />
    );
};
