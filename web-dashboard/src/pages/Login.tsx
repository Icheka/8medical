import { FunctionComponent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { IMAGES } from "../assets/images";
import { FormikField } from "../components/base/InputField";
import { LoginValidations } from "../formik-validations";
import { BiEnvelope } from "react-icons/bi";
import { MdVpnKey } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { OutlineButton, PrimaryButton } from "../components/base";
import { IResponderSigninPayload } from "../types/service-types";
import { ResponderAccountService } from "../services";
import { toast } from "react-toastify";
import { useResponder } from "../context";
import { routes } from "../config";
import { ForgotPasswordModal } from "../components/domains/ForgotPassword";

export const LoginPage: FunctionComponent = () => {
    // vars
    const navigate = useNavigate();

    // state
    const responderContext = useResponder();
    const [isLoading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    // utils
    const handleLogin = async (values: IResponderSigninPayload) => {
        setLoading(true);

        const [code, data] = await ResponderAccountService.signin(values);

        setLoading(false);

        if (code !== 0) {
            return toast.error(data);
        }

        responderContext!.updateContext((draft) => {
            draft!.currentResponder = data;
        });
        navigate(routes.dashboard.index);
    };

    return (
        <div>
            <div className={`flex h-screen`}>
                <div className={`w-1/2 bg-white px-28 flex flex-col justify-center`}>
                    <div className={`flex space-x-3 items-center mb-16`}>
                        <img className={`w-10`} src={IMAGES.Logo} alt={"8Medical logo"} />
                        <span className={`font-bold text-3xl`}>EightMedical</span>
                    </div>
                    <div>
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                            }}
                            validationSchema={LoginValidations}
                            onSubmit={handleLogin}
                        >
                            {(formik) => (
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        formik.handleSubmit();
                                    }}
                                >
                                    <div className={`font-bold text-md text-gray-500 uppercase`}>Welcome back, Icheka</div>
                                    <div className={`font-bold text-4xl mt-7 mb-6 text-gray-900`}>Log in to your account</div>
                                    <div className={`w-full space-y-4`}>
                                        <FormikField placeholder={"Your E-Email"} name={"email"} label={"E-Mail"} showLabel leftIcon={<BiEnvelope color={"#DFE2E6"} />} />
                                        <FormikField
                                            placeholder={"Your Password"}
                                            name={"password"}
                                            label={"Password"}
                                            showLabel
                                            leftIcon={<MdVpnKey color={`#DFE2E6`} />}
                                            rightIcon={
                                                <button type={"button"} onClick={() => setShowPassword(!showPassword)}>
                                                    {showPassword ? <AiFillEyeInvisible color={`#DFE2E6`} /> : <AiFillEye color={`#DFE2E6`} />}
                                                </button>
                                            }
                                            type={showPassword ? "text" : "password"}
                                        />
                                    </div>
                                    <div className={`flex items-center justify-between space-x-12 mt-10 mb-6`}>
                                        <OutlineButton type={"button"} className={`w-full py-3 flex justify-center items-center font-bold text-md`}>
                                            <Link to={routes.responder.signup}>Register</Link>
                                        </OutlineButton>
                                        <PrimaryButton loading={isLoading} type={"submit"} className={`w-full py-3 flex justify-center items-center font-bold text-md`} text={"Log in"} />
                                    </div>
                                    <div className={`flex items-center justify-between text-[#bebcbc] font-medium text-md`}>
                                        <div className={`flex items-center space-x-3`}>
                                            <span className={`border border-purple-700 p-0 flex items-center justify-center outline-purple-600 rounded-sm`}>
                                                <input type={"checkbox"} />
                                            </span>
                                            <span>Remember me</span>
                                        </div>
                                        <div>
                                            <button onClick={() => setShowForgotPassword(true)} type={"button"}>
                                                Forgot password?
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
                <div
                    className={`w-1/2`}
                    style={{
                        backgroundImage: `url("${IMAGES.Login}")`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "0% 60%",
                        backgroundColor: "indigo",
                    }}
                />
            </div>

            <ForgotPasswordModal isOpen={showForgotPassword} onClose={() => setShowForgotPassword(false)} />
        </div>
    );
};
