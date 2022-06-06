import { createContext, Dispatch, FunctionComponent, SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import { RouteProps, useLocation, useNavigate, Navigate, Route } from "react-router-dom";
import { Updater, useImmer } from "use-immer";
import { routes } from "../config";
import { LoginPage } from "../pages";
import { ResponderAccountService } from "../services";
import { IResponder, IResponderSigninPayload, IResponderSignupPayload } from "../types/service-types";
import { INotification } from "../types/service-types/Notification";

export interface IScopedNotification extends INotification {
    key?: any;
    onClose?: VoidFunction;
}

interface IResponderAuthContext {
    user?: IResponder;
    setUser?: Updater<IResponder | undefined>;
    loading: boolean;
    error?: any;
    login: (p: IResponderSigninPayload) => Promise<[number, any]>;
    signup: (p: IResponderSignupPayload) => void;
    logout: VoidFunction;
    notifications: Array<IScopedNotification>;
    setNotifications: Dispatch<SetStateAction<IScopedNotification[]>>;
}

const AuthContext = createContext<IResponderAuthContext>({} as IResponderAuthContext);

interface IResponderAuthProvider {
    children?: any;
}

export const ResponderAuthProvider: FunctionComponent<IResponderAuthProvider> = ({ children }) => {
    // vars
    const navigate = useNavigate();
    const location = useLocation();

    // state
    const [user, setUser] = useImmer<IResponder | undefined>(undefined);
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [notifications, setNotifications] = useState<Array<IScopedNotification>>([]);

    // utils
    const login = async (p: IResponderSigninPayload) => {
        setLoading(true);

        return ResponderAccountService.signin(p)
            .then(([code, data]) => {
                if (code !== 0) return [code, data] as [number, any];
                setUser(data.user);
                localStorage.setItem("responder_auth", data.token);

                navigate(routes.responder.dashboardOverview);
                return [code, data] as [number, any];
            })
            .catch((error) => {
                setError(error);
                return [1, "An error occurred"] as [number, any];
            })
            .finally(() => setLoading(false));
    };
    const signup = async (p: IResponderSignupPayload) => {
        setLoading(true);

        ResponderAccountService.signup(p)
            .then((data) => data)
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    };
    const logout = async () => {
        ResponderAccountService.signout()
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
            notifications,
            setNotifications,
        }),
        [user, loading, error, notifications.length]
    );

    // hooks
    useEffect(() => {
        if (error) setError(null);
    }, [location.pathname]);
    useEffect(() => {
        if (location.pathname.startsWith("/admin")) return;
        ResponderAccountService.whoami()
            .then(([code, data]) => {
                console.log("==>", code);
                if (code !== 0) return navigate(routes.responder.signin);
                setUser(data as IResponder);
            })
            .catch((error) => setError(error))
            .finally(() => setLoadingInitial(false));
    }, []);

    return <AuthContext.Provider value={memoisedValue}>{!loadingInitial && children}</AuthContext.Provider>;
};

export const useResponderAuth = () => useContext(AuthContext);

export const ResponderProtectedRoute = (props: any) => {
    const { user } = useResponderAuth();

    if (!user) return <Navigate replace to={routes.responder.signin} />;
    return props.element ?? props.children;
};
