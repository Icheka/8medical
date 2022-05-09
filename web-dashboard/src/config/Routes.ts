const bases = {
    dashboard: "/dashboard",
    rides: `/dashboard/rides`,
};

export const routes = {
    index: "/",
    dashboard: {
        index: bases.dashboard,
        rides: {
            index: bases.rides,
        },
    },
};
