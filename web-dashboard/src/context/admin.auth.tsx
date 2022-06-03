import { createContext, FunctionComponent, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { Updater, useImmer } from "use-immer";
import { routes } from "../config";
import { AdminAccountService } from "../services";
import { IAdmin, IAdminSigninPayload, IAdminSignupPayload } from "../types/service-types";

interface IAdminAuthContext {
    user?: IAdmin;
    setUser?: Updater<IAdmin | undefined>;
    loading: boolean;
    error?: any;
    login: (p: IAdminSigninPayload) => Promise<[number, any]>;
    signup: (p: IAdminSignupPayload) => void;
    logout: VoidFunction;
}

const AuthContext = createContext<IAdminAuthContext>({} as IAdminAuthContext);

interface IAdminAuthProvider {
    children?: any;
}

export const AdminAuthProvider: FunctionComponent<IAdminAuthProvider> = ({ children }) => {
    // vars
    const navigate = useNavigate();
    const location = useLocation();

    // state
    const [user, setUser] = useImmer<IAdmin | undefined>(undefined);
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [loadingInitial, setLoadingInitial] = useState(true);

    // utils
    const login = async (p: IAdminSigninPayload) => {
        setLoading(true);

        return AdminAccountService.signin(p)
            .then(([code, data]) => {
                if (code !== 0) return [code, data] as [number, any];
                setUser(data.user);
                localStorage.setItem("admin_auth", data.token);

                navigate(routes.admin.index);
                return [code, data] as [number, any];
            })
            .catch((error) => {
                setError(error);
                return [1, "An error occurred"] as [number, any];
            })
            .finally(() => setLoading(false));
    };
    const signup = async (p: IAdminSignupPayload) => {
        setLoading(true);

        AdminAccountService.signup(p)
            .then((data) => data)
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    };
    const logout = async () => {
        AdminAccountService.signout()
            .then(() => setUser(undefined))
            .catch((error) => setError(error));
    };
    const memoisedValue = useMemo(
        () => ({
            user,
            loading,
            error,
            login,
            signup,
            logout,
            setUser,
        }),
        [user, loading, error]
    );

    // hooks
    useEffect(() => {
        if (error) setError(null);
    }, [location.pathname]);
    useEffect(() => {
        if (!location.pathname.startsWith("/admin")) return;
        AdminAccountService.whoami()
            .then(([code, data]) => {
                if (code !== 0) return navigate(routes.admin.signin);
                setUser(data as IAdmin);
            })
            .catch((error) => setError(error))
            .finally(() => setLoadingInitial(false));
    }, []);

    return <AuthContext.Provider value={memoisedValue}>{!loadingInitial && children}</AuthContext.Provider>;
};

export const useAdminAuth = () => useContext(AuthContext);

export const AdminProtectedRoute = (props: any) => {
    const { user } = useAdminAuth();

    if (!user) return <Navigate replace to={routes.admin.signin} />;
    return props.element ?? props.children;
};
