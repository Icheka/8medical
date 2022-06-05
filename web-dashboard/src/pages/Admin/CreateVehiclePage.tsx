import { Formik } from "formik";
import { FunctionComponent, useState } from "react";
import { toast } from "react-toastify";
import { Dropdown, FormikField, IOption, PrimaryButton } from "../../components/base";
import { SelectResponder } from "../../components/base/AutoComplete";
import { AdminDashboardHeader, Page } from "../../components/layout";
import { AdminVehiclesService } from "../../services";
import { EVehicleType, IVehicle } from "../../types/service-types";
import { capitalize } from "capitalization";

const vehicleTypes = Object.values(EVehicleType);

export const CreateVehiclePage: FunctionComponent = () => {
    // state
    const [isSubmitting, setIsSubmitting] = useState(false);

    // utils
    const handleSubmit = (values: Partial<IVehicle>) => {
        setIsSubmitting(true);

        AdminVehiclesService.create(values)
            .then(([code, data]) => {
                if (code !== 0) return toast.error(data);
                toast(`New vehicle added successfully!`);
            })
            .catch((err) => null)
            .finally(() => setIsSubmitting(false));
    };

    return (
        <Page loading={false}>
            <AdminDashboardHeader title={'Add Vehicle'} hideActionButtons />
            <Formik
                initialValues={{
                    assignedTo: "",
                    registrationPlate: "",
                    type: EVehicleType.ambulance,
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
                            <FormikField label={"Registration Number"} name={"registrationPlate"} showLabel />
                            <Dropdown
                                fieldLabel="Vehicle Type"
                                showFieldLabel
                                label={capitalize(formik.values.type ?? '')}
                                options={Object.values(EVehicleType).map((type) => ({
                                    label: capitalize(type),
                                    value: type,
                                }))}
                                onSelect={(index) => formik.setFieldValue("type", vehicleTypes[index])}
                            />
                            <SelectResponder onChange={(responder: IOption) => formik.setFieldValue("assignedTo", responder.value)} fieldLabel={"Assign Responder"} showFieldLabel />
                        </div>
                        <div className={`mt-6`}>
                            {formik.values.assignedTo}
                            <PrimaryButton loading={isSubmitting} type={"submit"} className={`px-6 py-1`} text={"Save"} />
                        </div>
                    </form>
                )}
            </Formik>
        </Page>
    );
};
