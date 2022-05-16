import { FunctionComponent } from "react";
import { Route, Routes } from "react-router-dom";
import { DashboardHeader } from "../../components/layout";
import { BankSettingsPage } from "./Bank";
import { PasswordSettingsPage } from "./Password";
import { ProfileSettingsPage } from "./Profile";

export const SettingsPage: FunctionComponent = () => {
    return (
        <div>
            <DashboardHeader title={"Settings"} hideActionButtons />
            <div className={`border rounded-2xl overflow-hidden pt-0 h-full divide-y`}>
                <ProfileSettingsPage />
                <BankSettingsPage />
                <PasswordSettingsPage />
            </div>
        </div>
    );
};
