import { Formik } from "formik";
import { FunctionComponent, useState } from "react";
import { IMAGES } from "../assets/images";
import { FormikField } from "../components/base/InputField";
import { LoginValidations } from "../formik-validations";
import { BiEnvelope } from "react-icons/bi";
import { MdVpnKey } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { OutlineButton, PrimaryButton } from "../components/base";
import { PurpleLink } from "../components/base/Links";
import { routes, _8MedicalLinks } from "../config";
import { Logo } from "../components/brand";
import { IResponderSignupPayload } from "../types/service-types";
import { ResponderAccountService } from "../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const SignupPage: FunctionComponent = () => {
    // vars
    const navigate = useNavigate();

    // state
    const [isSaving, setIsSaving] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false)

    // utils
    const handleSave = async (values: IResponderSignupPayload) => {
        if (!hasAcceptedTerms) return toast.error('You need to read and agree to our Terms of Conditions to sign up');

        setIsSaving(true);
        const [code, data] = await ResponderAccountService.signup(values);
        setIsSaving(false);

        if (code !== 0) return toast.error(data);
        navigate(routes.responder.signin);
        return toast(data);
    };

    return (
        <div>
            <div className={`lg:flex h-screen`}>
                <div className={`w-full lg:w-1/2 pt-10 h-screen bg-gray-50 pb-8 lg:bg-white lg:pt-0 px-4 lg:px-28 flex flex-col lg:justify-center`}>
                    <div>
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                                firstName: "",
                                lastName: "",
                                phone: "",
                            }}
                            validationSchema={LoginValidations}
                            onSubmit={handleSave}
                        >
                            {(formik) => (
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        formik.handleSubmit();
                                    }}
                                    className={`bg-white p-1 lg:p-0 rounded-lg`}
                                >
                                    <div className={`scale-90 -ml-4 mt-2 mb-3 lg:hidden`}>
                                        <Logo />
                                    </div>
                                    <div className={`font-bold text-4xl mb-6 text-gray-900`}>Create an account</div>
                                    <div className={`w-full space-y-4`}>
                                        <FormikField placeholder={"First name here"} name={"firstName"} label={"First Name"} showLabel leftIcon={<BiEnvelope color={"#DFE2E6"} />} />
                                        <FormikField placeholder={"Last name here"} name={"lastName"} label={"Last Name"} showLabel leftIcon={<BiEnvelope color={"#DFE2E6"} />} />
                                        <FormikField placeholder={"Your E-Email"} name={"email"} label={"E-Mail"} showLabel leftIcon={<BiEnvelope color={"#DFE2E6"} />} />
                                        <FormikField
                                            placeholder={"Your Password"}
                                            name={"password"}
                                            label={"Password"}
                                            showLabel
                                            leftIcon={<MdVpnKey color={`#DFE2E6`} />}
                                            rightIcon={
                                                <button>
                                                    <AiFillEye color={`#DFE2E6`} />
                                                </button>
                                            }
                                            type={showPassword ? "text" : "password"}
                                        />
                                    </div>
                                    <div className={`mt-10 flex items-center space-x-2`}>
                                        <span className={`border border-purple-700 p-0 flex items-center justify-center outline-purple-600 rounded-sm`}>
                                            <input onChange={() => setHasAcceptedTerms(!hasAcceptedTerms)} type={"checkbox"} className={`border border-purple-700 rounded-sm`} />
                                        </span>
                                        <span>
                                            I accept the <PurpleLink blank text={"Terms & Conditions"} href={_8MedicalLinks.termsAndConditions} />
                                        </span>
                                    </div>
                                    <div className={`flex items-center justify-between space-x-4 lg:space-x-12 mt-14`}>
                                        <OutlineButton
                                            onClick={() => navigate(routes.responder.signin)}
                                            type={"button"}
                                            className={`w-full py-3 flex justify-center items-center font-bold text-md`}
                                            text={"Log in"}
                                        />
                                        <PrimaryButton type={"submit"} className={`w-full py-3 flex justify-center items-center font-bold text-md`} text={"Sign up"} />
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
                <div
                    className={`hidden lg:block lg:w-1/2`}
                    style={{
                        backgroundImage: `url("${IMAGES.Login}")`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "0% 60%",
                        backgroundColor: "indigo",
                    }}
                />
            </div>
        </div>
    );
};
