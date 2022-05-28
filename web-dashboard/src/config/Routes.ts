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
    responder: {
        signup: "/dashboard/sign-up",
        signin: "/dashboard/sign-in",
        signout: "/dashboard/sign-out",
        ridesPage: "/dashboard/rides",
        calendarPage: "/dashboard/calendar",
    },
};
