import { Formik } from "formik";
import { FunctionComponent } from "react";
import { FormikField, PrimaryButton } from "../../components/base";
import { SettingsPageAccordion } from "../../components/domains";
import { ChangePasswordValidations } from "../../formik-validations";

export const PasswordSettingsPage: FunctionComponent = () => {
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
                        onSubmit={async () => null}
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
                                    <PrimaryButton className={`uppercase w-full flex justify-center items-center text-sm font-semibold h-12`}>Save new changes</PrimaryButton>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </SettingsPageAccordion>
    );
};
