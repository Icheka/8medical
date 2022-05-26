export const keys = {
    api: {
        path: process.env.REACT_APP_API_URL + "/api",
        buildPath: (fragment: string) => (fragment.startsWith("/") ? process.env.REACT_APP_API_URL + "/api" + fragment : process.env.REACT_APP_API_URL + "/api/" + fragment),
    },
};
