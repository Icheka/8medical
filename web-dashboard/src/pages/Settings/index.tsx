import { FunctionComponent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PrimaryButton } from "../../components/base";
import { DashboardHeader } from "../../components/layout";
import { VerificationNotificationModal, VerifiedBadge } from "../../components/verification";
import { useResponder } from "../../context";
import { ResponderAccountService } from "../../services";
import { IResponder } from "../../types/service-types";
import { BankSettingsPage } from "./Bank";
import { DocumentsSettingsPage } from "./Documents";
import { PasswordSettingsPage } from "./Password";
import { ProfileSettingsPage } from "./Profile";

export const SettingsPage: FunctionComponent = () => {
    // state
    const responderContext = useResponder();
    const [user, setUser] = useState<IResponder>();
    const [showVerificationPopup, setShowVerificationPopup] = useState(false);

    // utils
    const handleRequestVerification = async () => {
        if (!user?.idDocument) return toast.error("You have to submit a government-issued ID to be eligible for verification");
        if (user.verificationRequestPending) return toast.error("You already have a pending verification request. You will be notified about the status of your request in a few days.");

        const [code] = await ResponderAccountService.update({ verificationRequestPending: true });
        if (code !== 0) return toast.error("Something went wrong and your request could not be submitted. Check your network connection and try again.");
        toast("Your request for verification has been sent. You will be notified about the status of your application in a few days.");
    };

    // hooks
    useEffect(() => {
        if (!responderContext?.currentResponder?.user) return;
        setUser(responderContext!.currentResponder!.user);
    }, [JSON.stringify(responderContext?.currentResponder?.user)]);

    if (!user) return <div>Loading</div>;

    return (
        <div className={`relative min-h-[80vh]`}>
            <DashboardHeader title={"Settings"} hideActionButtons />
            <div className={`absolute top-2 right-0`}>
                <VerifiedBadge onClick={() => setShowVerificationPopup(true)} />
            </div>

            <div className={`border rounded-2xl px-2 overflow-hidden pt-0 h-full divide-y`}>
                <ProfileSettingsPage />
                <BankSettingsPage />
                <DocumentsSettingsPage />
                <PasswordSettingsPage />
            </div>

            {!user.accountVerified && (
                <div className={`absolute bottom-[8vh] w-full flex justify-center lg:justify-end`}>
                    <PrimaryButton onClick={handleRequestVerification} className={`px-4 py-1 lg:mr-[270px] text-md font-semibold`} text={"Request Verification"} />
                </div>
            )}

            <VerificationNotificationModal isOpen={showVerificationPopup} onClose={() => setShowVerificationPopup(false)} isVerified={user!.accountVerified} verifiedAt={user!.verifiedAt} />
        </div>
    );
};
