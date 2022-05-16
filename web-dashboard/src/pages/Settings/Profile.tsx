import { Formik } from "formik";
import { FunctionComponent } from "react";
import { FormikField, PrimaryButton } from "../../components/base";
import { SettingsPageAccordion } from "../../components/domains";
import { ChangeableProfilePicture } from "../../components/profile-picture";
import { ProfileDetailsValidations } from "../../formik-validations";

export const ProfileSettingsPage: FunctionComponent = () => {
    return (
        <SettingsPageAccordion label={"Profile Details"}>
            <div className={`w-full flex justify-center relative`}>
                <div className={`w-full max-w-[400px] ml-0 mt-20 xl:mt-0`}>
                    <Formik
                        initialValues={{
                            email: "",
                            firstName: "",
                            lastName: "",
                            address: "",
                        }}
                        validationSchema={ProfileDetailsValidations}
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
                                    <FormikField name={"firstName"} label={"First Name"} showLabel />
                                    <FormikField name={"lastName"} label={"Last Name"} showLabel />
                                    <FormikField name={"email"} label={"Email"} type={"email"} showLabel />
                                    <FormikField name={"address"} label={"Address"} showLabel />
                                </div>
                                <div>
                                    <PrimaryButton className={`uppercase w-full flex justify-center items-center text-sm font-semibold h-12`}>Save new changes</PrimaryButton>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>

                <div className={`-top-7 left-[50%] -ml-[15%] xl:ml-0 xl:-top-6 xl:left-14 absolute`}>
                    <ChangeableProfilePicture />
                </div>
            </div>
        </SettingsPageAccordion>
    );
};
