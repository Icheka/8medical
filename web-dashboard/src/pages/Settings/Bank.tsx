import { Formik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FormikField, PrimaryButton } from "../../components/base";
import { SettingsPageAccordion } from "../../components/domains";
import { useResponderAuth } from "../../context/responder.auth";
import { AccountDetailsValidations } from "../../formik-validations";
import { ResponderAccountService } from "../../services";
import { IResponder } from "../../types/service-types";

export const BankSettingsPage: FunctionComponent = () => {
    // state
    const auth = useResponderAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [user, setUser] = useState<IResponder>();

    // utils
    const handleSubmit = async (values: Record<string, string>) => {
        setIsSubmitting(true);

        const [code, data] = await ResponderAccountService.update(values);
        setIsSubmitting(false);

        if (code !== 0) return toast.error(data);
        toast("Your account settings have been updated successfully!");
        await ResponderAccountService.whoami(auth);
    };

    // hooks
    useEffect(() => {
        setUser(auth.user);
    }, [JSON.stringify(auth.user)]);

    if (!user) return null;

    return (
        <SettingsPageAccordion label={"Account Details"}>
            <div className={`w-full flex justify-center`}>
                <div className={`w-full max-w-[400px]`}>
                    <Formik
                        initialValues={{
                            bankName: user.bankName ?? '',
                            bankAccountName: user.bankAccountName ?? '',
                            bankAccountNumber: user.bankAccountNumber ?? '',
                        }}
                        validationSchema={AccountDetailsValidations}
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
                                    <FormikField name={"bankName"} label={"Bank"} showLabel />
                                    <FormikField name={"bankAccountName"} label={"Account Name"} showLabel />
                                    <FormikField name={"bankAccountNumber"} label={"Account Number"} maxLength={10} minLength={10} showLabel />
                                </div>
                                <div>
                                    <PrimaryButton loading={isSubmitting} type={"submit"} className={`uppercase w-full flex justify-center items-center text-sm font-semibold h-12`}>
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
