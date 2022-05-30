import { Method } from "axios";

export type TServiceMethod = Method;

export type TServicePath = {
    method: TServiceMethod;
    path: string;
};

const baseResponderPath = "/responder";

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
                    method: 'get',
                    path: base.concat('/:id')
                }
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
};
