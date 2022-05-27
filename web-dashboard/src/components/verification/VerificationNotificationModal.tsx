import { FunctionComponent } from "react";
import { Modal, PrimaryButton } from "../base";

interface IVerificationNotificationModal {
    isOpen: boolean;
    isVerified: boolean;
    onClose: VoidFunction;
    verifiedAt?: Date;
}

export const VerificationNotificationModal: FunctionComponent<IVerificationNotificationModal> = ({ isOpen, isVerified, onClose, verifiedAt }) => {
    // vars
    const text = isVerified ? <VerifiedText verifiedAt={verifiedAt!} /> : <NotVerifiedText />;

    return (
        <Modal width={"400px"} isOpen={isOpen} onClose={onClose}>
            <div className={`mt-3`}>
                {text}
                <div className={`mt-3`}>
                    <PrimaryButton onClick={onClose} className={`w-full flex justify-center items-center font-semibold text-lg py-[6px]`} text={"Okay"} />
                </div>
            </div>
        </Modal>
    );
};

const NotVerifiedText: FunctionComponent = () => (
    <div className={`break-normal`}>
        <div className={`font-semibold text-lg text-red-600`}>Your account has not been verified.</div>
        <div className={`font-medium`}>You won't be able to go on missions until you verify your account</div>
        Go to <strong className={`text-green-600`}>Settings</strong> → <strong className={`text-green-600`}>Documents &amp; Certification</strong> and upload{" "}
        <span className={`text-red-600`}>a valid government-issued ID (e.g drivers licence, passport, voter's registration card) and your certificates (educational, professional, etc)</span>. After,
        click the 'Request Verification' button at the bottom of the Settings page to request to be verified.
    </div>
);

const VerifiedText: FunctionComponent<{ verifiedAt: Date }> = ({ verifiedAt }) => (
    <div>
        Your account was verified on ${new Date(verifiedAt).toLocaleDateString("en-GB")} at $
        {new Date(verifiedAt).toLocaleTimeString("en-GB", {
            hour12: true,
        })}
    </div>
);
