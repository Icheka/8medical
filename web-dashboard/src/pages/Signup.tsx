import { Formik } from "formik";
import { FunctionComponent } from "react";
import { IMAGES } from "../assets/images";
import { FormikField } from "../components/base/InputField";
import { LoginValidations } from "../formik-validations";
import { BiEnvelope } from "react-icons/bi";
import { MdVpnKey } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { OutlineButton, PrimaryButton } from "../components/base";
import { PurpleLink } from "../components/base/Links";
import { _8MedicalLinks } from "../config";

export const SignupPage: FunctionComponent = () => {
    return (
        <div>
            <div className={`flex h-screen`}>
                <div className={`w-1/2 bg-white px-28 flex flex-col justify-center`}>
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
                                        />
                                    </div>
                                    <div className={`mt-10 flex items-center space-x-2`}>
                                        <input type={"checkbox"} className={`border border-purple-700 rounded-sm`} />
                                        <span>
                                            I accept the <PurpleLink blank text={"Terms & Conditions"} href={_8MedicalLinks.termsAndConditions} />
                                        </span>
                                    </div>
                                    <div className={`flex items-center justify-between space-x-12 mt-14`}>
                                        <OutlineButton className={`w-full py-3 flex justify-center items-center font-bold text-md`} text={"Register"} />
                                        <PrimaryButton className={`w-full py-3 flex justify-center items-center font-bold text-md`} text={"Log in"} />
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
