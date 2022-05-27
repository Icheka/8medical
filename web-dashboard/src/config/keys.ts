export const keys = {
    api: {
        path: process.env.REACT_APP_API_URL + "/api",
        buildPath: (fragment: string) => (fragment.startsWith("/") ? process.env.REACT_APP_API_URL + "/api" + fragment : process.env.REACT_APP_API_URL + "/api/" + fragment),
    },
    cloudinary: {
        clouudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME!,
        presets: {
            unsigned: process.env.REACT_APP_CLOUDINARY_UNSIGNED_PRESET!,
        },
    },
};
