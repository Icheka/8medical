import { Https } from "./Https";

export const AdminHttps = new Https({
    localStorageKey: "admin_auth",
    onAuthError: (error) => null,
    signInRoute: "/admin/sign-in",
});
