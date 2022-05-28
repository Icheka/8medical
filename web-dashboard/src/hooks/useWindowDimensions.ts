import { useEffect, useState } from "react";

export const useWindowWidth = () => {
    const [width, setWidth] = useState<number>();

    const handleWindowResize = () => setWidth(window.innerWidth);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setWidth(window.innerWidth);
            window.addEventListener("resize", handleWindowResize, true);
            window.addEventListener("fullscreenchange", handleWindowResize, true);

            return () => {
                window.removeEventListener("resize", handleWindowResize, true);
                window.removeEventListener("fullscreenchange", handleWindowResize, true);
            };
        }
    }, []);

    return width ? width : 0;
};
