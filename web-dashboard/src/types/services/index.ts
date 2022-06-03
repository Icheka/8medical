import { Method } from "axios";

export type TServiceMethod = Method;

export type TServicePath = {
    method: TServiceMethod;
    path: string;
};

const baseResponderPath = "/responder";
const baseAdminPath = "/admin";

export const SERVICE_PATHS = {
    Responder: {
        account: (): Record<string, TServicePath> => {
            const base = baseResponderPath.concat("/account");

            return {
                whoami: {
                    method: "get",
                    path: base,
                },
                signup: {
                    method: "post",
                    path: base,
                },
                signout: {
                    method: "get",
                    path: base.concat("/revoke"),
                },
                login: {
                    method: "post",
                    path: base.concat("/sign-in"),
                },
                update: {
                    method: "patch",
                    path: base,
                },
                export: {
                    method: "get",
                    path: base.concat("/export"),
                },
                resetPassword: {
                    method: "post",
                    path: base.concat("/password"),
                },
                changePassword: {
                    method: "patch",
                    path: base.concat("/password"),
                },
            };
        },
        missions: (): Record<string, TServicePath> => {
            const base = baseResponderPath.concat("/missions");

            return {
                fetchAll: {
                    method: "get",
                    path: base,
                },
                fetchOne: {
                    method: "get",
                    path: base.concat("/:id"),
                },
            };
        },
        calendar: (): Record<string, TServicePath> => {
            const base = baseResponderPath.concat("/events");

            return {
                fetchAll: {
                    method: "get",
                    path: base,
                },
                addEvents: {
                    method: "post",
                    path: base,
                },
            };
        },
    },
    Admin: {
        account: (): Record<string, TServicePath> => {
            const base = baseAdminPath.concat("/account");

            return {
                whoami: {
                    method: "get",
                    path: base,
                },
                signup: {
                    method: "post",
                    path: base,
                },
                signout: {
                    method: "get",
                    path: base.concat("/revoke"),
                },
                login: {
                    method: "post",
                    path: base.concat("/sign-in"),
                },
                update: {
                    method: "patch",
                    path: base,
                },
                export: {
                    method: "get",
                    path: base.concat("/export"),
                },
                resetPassword: {
                    method: "post",
                    path: base.concat("/password"),
                },
                changePassword: {
                    method: "patch",
                    path: base.concat("/password"),
                },
            };
        },
        responders: (): Record<string, TServicePath> => {
            const base = baseAdminPath.concat("/responders");

            return {
                fetchAll: {
                    method: "get",
                    path: base,
                },
                create: {
                    method: "post",
                    path: base,
                },
                fetchById: {
                    method: "get",
                    path: base.concat("/_id_"),
                },
                updateById: {
                    method: "patch",
                    path: base.concat("/_id_"),
                },
                deleteById: {
                    method: "delete",
                    path: base.concat("/_id_"),
                },
            };
        },
        vehicles: (): Record<string, TServicePath> => {
            const base = baseAdminPath.concat("/vehicles");

            return {
                fetchAll: {
                    method: "get",
                    path: base,
                },
                create: {
                    method: "post",
                    path: base,
                },
                fetchById: {
                    method: "get",
                    path: base.concat("/_id_"),
                },
                updateById: {
                    method: "patch",
                    path: base.concat("/_id_"),
                },
                deleteById: {
                    method: "delete",
                    path: base.concat("/_id_"),
                },
            };
        },
    },
};
