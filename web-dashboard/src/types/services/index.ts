import { Method } from "axios";

export type TServiceMethod = Method;

export type TServicePath = {
    method: TServiceMethod;
    path: string;
};

const base_responder_path = "/responder";

export const SERVICE_PATHS = {
    Responder: {
        account: (): Record<string, TServicePath> => {
            const base = base_responder_path.concat("/account");

            return {
                whoami: {
                    method: "get",
                    path: base,
                },
                signup: {
                    method: "post",
                    path: base,
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
            const base = base_responder_path.concat("/missions");

            return {
                fetchAll: {
                    method: "get",
                    path: base,
                },
            };
        },
    },
};
