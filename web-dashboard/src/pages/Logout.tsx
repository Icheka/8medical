import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ResponderAccountService } from "../services";

export const LogoutPage: FunctionComponent = () => {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            await ResponderAccountService.signout();
        })();
    }, []);

    return null;
};
