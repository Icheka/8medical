import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../components/base";
import { routes } from "../config";

export const PageUnfoundPage: FunctionComponent = () => {
    // vars
    const navigate = useNavigate();

    return (
        <div className={`px-4 py-10 space-y-2`}>
            <div>You are lost.</div>
            <div>Click this button to return to homepage</div>
            <div>
                <PrimaryButton onClick={() => navigate(routes.index)} className={`px-4`} text={"Return to homepage"} />
            </div>
        </div>
    );
};
