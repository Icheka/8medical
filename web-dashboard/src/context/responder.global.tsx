import { createContext, FunctionComponent, useContext, useEffect } from "react";
import { Updater, useImmer } from "use-immer";
import { EAccountActivityStatus, IResponder } from "../types/service-types";

interface IValue {
    currentResponder?: {
        user: IResponder;
        token: string;
    } | null;
    isLoggedIn: () => boolean;
    updateContext: Updater<IValue | null>;
}

export const ResponderContext = createContext<IValue | null>(null);
const { Provider } = ResponderContext;
const cacheKey = "ResponderContext";

export const ResponderContextProvider: FunctionComponent<{ children: any }> = ({ children }) => {
    // state
    const [value, setValue] = useImmer<IValue | null>(null);

    // utils
    const cache = () => {
        localStorage.setItem(cacheKey, JSON.stringify(value));
    };
    const decache = () => JSON.parse(localStorage.getItem(cacheKey) ?? JSON.stringify(null));
    const isLoggedIn = () => {
        const { user, token } = value?.currentResponder ?? { user: null, token: null };
        if (!user || !token) return false;

        return user.emailVerified && user.activityStatus === EAccountActivityStatus.Active;
    };

    // hooks
    useEffect(() => {
        const cached = decache();
        console.log("cached ->", cached);
        setValue({
            ...cached,
        });
    }, []);
    useEffect(() => {
        if (value === null) return;
        console.log("caching");
        cache();
    }, [JSON.stringify(value)]);

    return <Provider value={{ ...value, updateContext: setValue, isLoggedIn }}>{children}</Provider>;
};

export const useResponder = () => {
    const context = useContext(ResponderContext);

    if (context === undefined) throw new Error("useResponder must be used within ResponderContextProvider");

    return context;
};