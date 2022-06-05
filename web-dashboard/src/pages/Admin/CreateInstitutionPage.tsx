import { Formik } from "formik";
import { FunctionComponent, useState } from "react";
import { toast } from "react-toastify";
import { Dropdown, FormikField, IOption, PrimaryButton } from "../../components/base";
import { SelectResponder } from "../../components/base/AutoComplete";
import { AdminDashboardHeader, Page } from "../../components/layout";
import { AdminInstitutionsService } from "../../services";
import { EInstitutionType, IInstitution } from "../../types/service-types";
import { capitalize } from "capitalization";

const institutionTypes = Object.values(EInstitutionType);

export const CreateInstitutionPage: FunctionComponent = () => {
    // state
    const [isSubmitting, setIsSubmitting] = useState(false);

    // utils
    const handleSubmit = (values: Partial<IInstitution>) => {
        setIsSubmitting(true);

        AdminInstitutionsService.create(values)
            .then(([code, data]) => {
                if (code !== 0) return toast.error(data);
                toast(`New institution added successfully!`);
            })
            .catch((err) => null)
            .finally(() => setIsSubmitting(false));
    };

    return (
        <Page loading={false}>
            <AdminDashboardHeader title={'Add Institution'} hideActionButtons />
            <Formik
                initialValues={{
                    name: "",
                    type: EInstitutionType.hospital,
                    address: '',
                    email: '',
                    phone: ''
                }}
                onSubmit={handleSubmit}
            >
                {(formik) => (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                        }}
                    >
                        <div className={`grid grid-cols-1 lg:grid-cols-2 lg:gap-x-5 gap-y-4`}>
                            <FormikField label={"Name"} name={"name"} showLabel />
                            <Dropdown
                                fieldLabel="Institution Type"
                                showFieldLabel
                                label={capitalize(formik.values.type ?? '')}
                                options={Object.values(EInstitutionType).map((type) => ({
                                    label: capitalize(type),
                                    value: type,
                                }))}
                                onSelect={(index) => formik.setFieldValue("type", institutionTypes[index])}
                            />
                            <FormikField label={"Address"} name={"address"} showLabel />
                            <FormikField label={"Email"} type={'email'} name={"email"} showLabel />
                            <FormikField label={"Phone Number"} type={'tel'} name={"phone"} showLabel />
                        </div>
                        <div className={`mt-6`}>
                            <PrimaryButton loading={isSubmitting} type={"submit"} className={`px-6 py-1`} text={"Save"} />
                        </div>
                    </form>
                )}
            </Formik>
        </Page>
    );
};
