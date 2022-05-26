import { Https } from "./Https";

export const ResponderHttps = new Https({
    localStorageKey: "responder_auth",
    onAuthError: (error) => null,
    signInRoute: "/sign-in",
});
