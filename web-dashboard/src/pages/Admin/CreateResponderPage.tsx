import { Formik, FormikProps } from "formik";
import { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FormikField, PrimaryButton } from "../../components/base";
import { Page } from "../../components/layout";
import { routes } from "../../config";
import { LoginValidations } from "../../formik-validations";
import { AdminRespondersService, ResponderAccountService } from "../../services";
import { IResponder, IResponderSignupPayload } from "../../types/service-types";

export const CreateResponderPage: FunctionComponent = () => {
    // state
    const [isLoading, setIsLoading] = useState(false);
    const [newResponder, setNewResponder] = useState<IResponder>();

    // utils
    const handleSubmit = async (values: IResponderSignupPayload) => {
        setIsLoading(true);
        values.password = values.email;

        AdminRespondersService.create(values)
            .then(([code, data]) => {
                if (code !== 0) return toast.error(data);
                setNewResponder(data);
                toast("New Responder account created successfully!");
            })
            .catch((err) => null)
            .finally(() => setIsLoading(false));
    };
    const clearForm = (formik: FormikProps<IResponderSignupPayload>) => {
        setNewResponder(undefined);
        formik.setValues(formik.initialValues);
    };

    return (
        <Page loading={isLoading}>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "password_1",
                    phone: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={LoginValidations}
            >
                {(formik) => (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                        }}
                        className={`border rounded-2xl border-gray-200 shadow-sm p-6`}
                    >
                        <div>
                            <div></div>
                            <div className={`grid grid-cols-1 lg:grid-cols-2 lg:gap-x-5 gap-y-4`}>
                                <FormikField name={"firstName"} showLabel label={"First Name"} />
                                <FormikField name={"lastName"} showLabel label={"Last Name"} />
                                <FormikField type={"email"} className={`!ring-0`} name={"email"} showLabel label={"Email Address"} />
                                <FormikField name={"phone"} showLabel label={"Phone Number (Optional)"} />
                            </div>
                        </div>
                        <div className={`flex justify-end space-x-3 items-center mt-5`}>
                            <PrimaryButton
                                onClick={() => clearForm(formik)}
                                type={"button"}
                                className={`px-5 py-1 !bg-red-500 hover:bg-red-400 border-red-500 hover:border-red-400`}
                                text={"Clear Form"}
                            />
                            {newResponder ? (
                                <Link to={routes.admin.responders + "/details/" + newResponder._id}>
                                    <PrimaryButton type={"button"} className={`px-5 py-1`} text={"Update Profile"} />
                                </Link>
                            ) : (
                                <PrimaryButton loading={isLoading} type={"submit"} className={`px-5 py-1`} text={"Save"} />
                            )}
                        </div>
                    </form>
                )}
            </Formik>
        </Page>
    );
};
