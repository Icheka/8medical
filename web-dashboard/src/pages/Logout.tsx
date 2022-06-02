import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useResponder } from "../context";
import { useResponderAuth } from "../context/responder.auth";
import { ResponderAccountService } from "../services";

export const LogoutPage: FunctionComponent = () => {
    const navigate = useNavigate();
    const responderContext = useResponder();
    const { logout } = useResponderAuth();

    useEffect(() => {
        (async () => {
            await logout();
            await ResponderAccountService.signout();
        })();
    }, []);

    return null;
};
