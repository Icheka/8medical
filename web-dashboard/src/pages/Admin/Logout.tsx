import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context";
import { AdminAccountService } from "../../services";

export const AdminLogoutPage: FunctionComponent = () => {
    const { logout } = useAdminAuth();

    useEffect(() => {
        (async () => {
            await logout();
            await AdminAccountService.signout();
        })();
    }, []);

    return null;
};
