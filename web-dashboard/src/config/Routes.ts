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
        signin: "/admin/sign-in",

        overview: "/admin/dashboard",
        signout: "/admin/dashboard/sign-out",
        enrollees: "/admin/dashboard/enrollees",
        responders: "/admin/dashboard/responders",
        vehicles: "/admin/dashboard/vehicles",
        institutions: "/admin/dashboard/institutions",
        missions: "/admin/dashboard/missions",
    },
};
