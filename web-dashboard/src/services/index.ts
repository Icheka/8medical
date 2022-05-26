export const networkError = (err: any) => err.response?.data?.error ?? `An error occurred!`;

export * from "./responder";
export * from "./responder.missions";
