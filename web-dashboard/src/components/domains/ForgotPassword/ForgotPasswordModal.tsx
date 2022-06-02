import { FunctionComponent, useState } from "react";
import { toast } from "react-toastify";
import { ResponderAccountService } from "../../../services";
import { IModal, Modal, PrimaryButton } from "../../base";

interface IForgotPasswordModal extends IModal {}

export const ForgotPasswordModal: FunctionComponent<IForgotPasswordModal> = ({ children, ...props }) => {
    // state
    const [email, setEmail] = useState("");

    // utils
    const handleSubmit = async () => {
        const [code, data] = await ResponderAccountService.resetPassword(email);
        if (code !== 0) return toast.error(data);
        toast("Verify it's really you by clicking the link we sent to your email to reset your password");
    };

    return (
        <Modal width={"400px"} {...props}>
            <div className={``}>
                <div>
                    <h3 className={`font-semibold text-purple-600 text-lg mb-1`}>Lost your password?</h3>
                    <h4 className={`text-md text-gray-500`}>We can help you get it back</h4>
                </div>
                <div className={`mt-4`}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        <label className={`font-semibold text-gray-700`}>Enter the email associated with your account</label>
                        <div className={`w-full border border-gray-500 bg-white rounded-sm mt-2 h-12`}>
                            <input onChange={(e) => setEmail(e.target.value)} className={`w-full h-full`} required type={"email"} placeholder={"Email"} />
                        </div>
                        <div className={`mt-5`}>
                            <PrimaryButton type={"submit"} className={`w-full h-12 opacity-70 flex justify-center items-center text-lg`} text={"Submit"} />
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};
