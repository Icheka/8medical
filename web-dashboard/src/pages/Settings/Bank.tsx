import { Formik } from "formik";
import { FunctionComponent } from "react";
import { FormikField, PrimaryButton } from "../../components/base";
import { SettingsPageAccordion } from "../../components/domains";
import { AccountDetailsValidations } from "../../formik-validations";

export const BankSettingsPage: FunctionComponent = () => {
    return (
        <SettingsPageAccordion label={"Account Details"}>
            <div className={`w-full flex justify-center`}>
                <div className={`w-full max-w-[400px]`}>
                    <Formik
                        initialValues={{
                            bank: "",
                            accountName: "",
                            accountNumber: "",
                        }}
                        validationSchema={AccountDetailsValidations}
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
                                    <FormikField name={"bank"} label={"Bank"} showLabel />
                                    <FormikField name={"accountName"} label={"Account Name"} showLabel />
                                    <FormikField name={"accountNumber"} label={"Account Number"} type={"number"} showLabel />
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
