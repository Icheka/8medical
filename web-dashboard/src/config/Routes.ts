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
        signup: "/sign-up",
        signin: "/sign-in",
        signout: "/dashboard/sign-out",
        ridesPage: "/dashboard/rides",
        calendarPage: "/dashboard/calendar",
        dashboardOverview: "/dashboard",
    },
    admin: {
        index: "/admin",
        enrollees: "/admin/enrollees",
        responders: "/admin/responders",
    },
};
