import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { IMAGES } from "../../assets/images";
import { FormikField } from "../../components/base/InputField";
import { LoginValidations } from "../../formik-validations";
import { BiEnvelope } from "react-icons/bi";
import { MdVpnKey } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { PrimaryButton } from "../../components/base";
import { IAdminSigninPayload } from "../../types/service-types";
import { toast } from "react-toastify";
import { routes } from "../../config";
import { useAdminAuth } from "../../context/admin.auth";

export const AdminLoginPage: FunctionComponent = () => {
    // vars
    const navigate = useNavigate();

    // state
    const auth = useAdminAuth();
    const [isLoading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // utils
    const handleLogin = async (values: IAdminSigninPayload) => {
        setLoading(true);

        const [code, data] = await auth.login(values);

        setLoading(false);

        if (code !== 0) {
            return toast.error(data);
        }

        navigate(routes.admin.index);
    };

    return (
        <div>
            <div className={`lg:flex h-screen`}>
                <div className={`w-full lg:w-1/2 pt-10 h-screen bg-gray-50 pb-8 lg:bg-white lg:pt-0 px-4 lg:px-28 flex flex-col lg:justify-center`}>
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
                                    <div className={`font-bold text-md text-gray-500 uppercase`}>8Medical Administrator</div>
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
                                    <div className={`flex mt-10 mb-6`}>
                                        <PrimaryButton loading={isLoading} type={"submit"} className={`w-full py-3 flex justify-center items-center font-bold text-md`} text={"Log in"} />
                                    </div>
                                    <div className={`flex items-center justify-between text-[#bebcbc] font-medium text-md`}>
                                        <div className={`flex items-center space-x-3`}>
                                            <span className={`border border-purple-700 p-0 flex items-center justify-center outline-purple-600 rounded-sm`}>
                                                <input type={"checkbox"} />
                                            </span>
                                            <span>Remember me</span>
                                        </div>
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
