import { Formik } from "formik";
import { FunctionComponent } from "react";
import { IMAGES } from "../assets/images";
import { FormikField } from "../components/base/InputField";
import { LoginValidations } from "../formik-validations";
import { BiEnvelope } from "react-icons/bi";
import { MdVpnKey } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { OutlineButton, PrimaryButton } from "../components/base";

export const LoginPage: FunctionComponent = () => {
    return (
        <div>
            <div className={`flex h-screen`}>
                <div className={`w-1/2 bg-white px-28 py-20`}>
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
                            onSubmit={async () => null}
                        >
                            {(formik) => (
                                <form>
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
                                                <button>
                                                    <AiFillEye color={`#DFE2E6`} />
                                                </button>
                                            }
                                        />
                                    </div>
                                    <div className={`flex items-center justify-between space-x-12 mt-10 mb-6`}>
                                        <OutlineButton className={`w-full py-3 flex justify-center items-center font-bold text-md`} text={"Register"} />
                                        <PrimaryButton className={`w-full py-3 flex justify-center items-center font-bold text-md`} text={"Log in"} />
                                    </div>
                                    <div className={`flex items-center justify-between text-[#D3D3D3] font-medium text-md`}>
                                        <div className={`flex items-center space-x-3`}>
                                            <input type={"checkbox"} className={`border border-purple-700 rounded-sm`} />
                                            <span>Remember me</span>
                                        </div>
                                        <div>
                                            <button>Forgot password?</button>
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
        </div>
    );
};
