import { Formik } from "formik";
import { FunctionComponent, useState } from "react";
import { toast } from "react-toastify";
import { FormikField, PrimaryButton } from "../../components/base";
import { Page } from "../../components/layout";
import { AdminDashboardHeader } from "../../components/layout";
import { AdminEnrolleesService } from "../../services";
import { IEnrollee } from "../../types/service-types";

export const CreateEnrolleePage: FunctionComponent = () => {
    // vars
    const fields: Array<{ name: string; type: string; label: string }> = [
        { label: "First Name", type: "text", name: "firstName" },
        { label: "Last Name", type: "text", name: "lastName" },
        { label: "Email Address", type: "email", name: "email" },
        { label: "Phone Number", type: "text", name: "phone" },
        { label: "Date of Birth", type: "date", name: "dateOfBirth" },
        { label: "Blood Group", type: "text", name: "bloodGroup" },
        { label: "Gender", type: "text", name: "gender" },
        { label: "Plan", type: "text", name: "plan" },
    ];

    // state
    const [isLoading, setIsLoading] = useState(false);

    // utils
    const handleSubmit = async (values: Record<string, any>) => {
        setIsLoading(true);
        values.dateOfBirth = new Date(values.dateOfBirth ?? '');
        values.name = `${values.firstName} ${values.lastName}`

        AdminEnrolleesService.create(values)
            .then(([code, data]) => {
                if (code !== 0) return toast.error(data);

                toast("New Enrollee added successfully!");
            })
            .catch((err) => null)
            .finally(() => setIsLoading(false));
    };

    return (
        <Page loading={false}>
            <div>
                <AdminDashboardHeader title={"Add Enrollee"} />
                <div className={`border rounded-lg p-6`}>
                    <Formik
                        initialValues={{
                            firstName: "",
                            lastName: "",
                            email: "",
                            phone: "",
                            dateOfBirth: "" as unknown as Date,
                            bloodGroup: "",
                            gender: "male",
                            Plan: "",
                        }}
                        onSubmit={handleSubmit}
                    >
                        {(formik) => (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    formik.handleSubmit();
                                }}
                                className={`w-full space-y-3`}
                            >
                                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-y-5 gap-x-8`}>
                                    {fields.map(({ name, type, label }, i) => (
                                        <div key={i}>
                                            <FormikField name={name} type={type} label={label} showLabel />
                                        </div>
                                    ))}
                                </div>
                                <div className={`flex justify-end`}>
                                    <PrimaryButton loading={isLoading} type={"submit"} className={`px-6 py-1`} text={"Create"} />
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </Page>
    );
};
