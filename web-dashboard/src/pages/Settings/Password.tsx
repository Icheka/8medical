import { Formik } from "formik";
import { FunctionComponent, useState } from "react";
import { toast } from "react-toastify";
import { FormikField, PrimaryButton } from "../../components/base";
import { SettingsPageAccordion } from "../../components/domains";
import { useResponder } from "../../context";
import { ChangePasswordValidations } from "../../formik-validations";
import { ResponderAccountService } from "../../services";

export const PasswordSettingsPage: FunctionComponent = () => {
    // state
    const responderContext = useResponder();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // utils
    const handleSubmit = async (values: { currentPassword: string; newPassword: string; confirmPassword: string }) => {
        if (values.newPassword !== values.confirmPassword) return toast.error("Passwords not do match!");

        setIsSubmitting(true);

        const [code, data] = await ResponderAccountService.changePassword({
            oldPassword: values.currentPassword,
            newPassword: values.newPassword,
        });
        setIsSubmitting(false);

        if (code !== 0) return toast.error(data);
        toast("Your password has been updated successfully!");
    };

    return (
        <SettingsPageAccordion label={"Change Password"}>
            <div className={`w-full flex justify-center`}>
                <div className={`w-full max-w-[400px]`}>
                    <Formik
                        initialValues={{
                            currentPassword: "",
                            newPassword: "",
                            confirmPassword: "",
                        }}
                        validationSchema={ChangePasswordValidations}
                        onSubmit={handleSubmit}
                    >
                        {(formik) => (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    formik.handleSubmit();
                                }}
                                className={`space-y-8`}
                            >
                                <div className={`space-y-5`}>
                                    <FormikField name={"currentPassword"} label={"Current Password"} type={"password"} showLabel />
                                    <FormikField name={"newPassword"} label={"New Password"} type={"password"} showLabel />
                                    <FormikField name={"confirmPassword"} label={"Confirm Password"} type={"password"} showLabel />
                                </div>
                                <div>
                                    <PrimaryButton type={"submit"} loading={isSubmitting} className={`uppercase w-full flex justify-center items-center text-sm font-semibold h-12`}>
                                        Save new changes
                                    </PrimaryButton>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </SettingsPageAccordion>
    );
};
