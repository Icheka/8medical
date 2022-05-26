import { Formik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FormikField, PrimaryButton } from "../../components/base";
import { SettingsPageAccordion } from "../../components/domains";
import { ChangeableProfilePicture } from "../../components/profile-picture";
import { useResponder } from "../../context";
import { ProfileDetailsValidations } from "../../formik-validations";
import { ResponderAccountService } from "../../services";
import { IResponder } from "../../types/service-types";

export const ProfileSettingsPage: FunctionComponent = () => {
    // state
    const responderContext = useResponder();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [user, setUser] = useState<IResponder>();

    // utils
    const handleSubmit = async (values: Record<string, string>) => {
        let fieldsWereUpdated = false;
        const payload: Record<string, string> = {};
        for (const [field, value] of Object.entries(values)) {
            if (responderContext!.currentResponder!.user[field as keyof IResponder] !== value) {
                fieldsWereUpdated = true;
                payload[field] = value;
            }
        }

        if (!fieldsWereUpdated) return;

        setIsSubmitting(true);

        if (Object.keys(payload).includes("email")) delete payload.email;
        const [code, data] = await ResponderAccountService.update(payload);
        setIsSubmitting(false);

        if (code !== 0) return toast.error(data);
        toast("Your profile was updated successfully!");
        await ResponderAccountService.whoami(responderContext as any);
    };

    // hooks
    useEffect(() => {
        if (responderContext?.currentResponder) setUser(responderContext!.currentResponder!.user);
    }, [JSON.stringify(responderContext?.currentResponder)]);

    if (!user?._id) return null;

    return (
        <SettingsPageAccordion label={"Profile Details"}>
            <div className={`w-full flex justify-center relative`}>
                <div className={`w-full max-w-[400px] ml-0 mt-20 xl:mt-0`}>
                    <Formik
                        initialValues={{
                            email: user?.email ?? "",
                            firstName: user?.firstName ?? "",
                            middleName: user?.middleName ?? "",
                            lastName: user?.lastName ?? "",
                            address: user?.address ?? "",
                        }}
                        validationSchema={ProfileDetailsValidations}
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
                                    <FormikField name={"firstName"} label={"First Name"} showLabel />
                                    <FormikField name={"middleName"} label={"Middle Name"} showLabel />
                                    <FormikField name={"lastName"} label={"Last Name"} showLabel />
                                    <FormikField disabled name={"email"} label={"Email"} type={"email"} showLabel />
                                    <FormikField name={"address"} label={"Address"} showLabel />
                                </div>
                                <div>
                                    <PrimaryButton loading={isSubmitting} className={`uppercase w-full flex justify-center items-center text-sm font-semibold h-12`}>
                                        Save new changes
                                    </PrimaryButton>
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
