export const networkError = (err: any) => err.response?.data?.error ?? `An error occurred!`;

export * from "./admin";
export * from "./responder";
export * from "./responder.calendar";
export * from "./responder.missions";
