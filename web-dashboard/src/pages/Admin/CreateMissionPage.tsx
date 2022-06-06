import { Formik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Dropdown, FormikField, IOption, PrimaryButton } from "../../components/base";
import { SelectResponder } from "../../components/base/AutoComplete";
import { AdminDashboardHeader, Page } from "../../components/layout";
import { AdminMissionsService, AdminRespondersService } from "../../services";
import { EMissionStatus, EMissionType, IMission, IResponder } from "../../types/service-types";
import { capitalize } from "capitalization";
import * as Yup from "yup";
import { FaTimesCircle } from "react-icons/fa";

const missionTypes = Object.values(EMissionType);

const validation = Yup.object({
    startTime: Yup.date().required("This field is required"),
    address: Yup.string().required("This field is required"),
    description: Yup.string().required("This field is required"),
});

export const CreateMissionPage: FunctionComponent = () => {
    // state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [responders, setResponders] = useState<Array<IResponder>>([]);

    // utils
    const handleSubmit = (values: Partial<IMission>) => {
        setIsSubmitting(true);

        AdminMissionsService.create(values)
            .then(([code, data]) => {
                if (code !== 0) return toast.error(data);
                toast(`New mission added successfully!`);
            })
            .catch((err) => null)
            .finally(() => setIsSubmitting(false));
    };
    const getResponderFromId = (id: string) => responders.find((r) => r._id === id);
    const fetchResponders = async () => {
        AdminRespondersService.fetchAll()
            .then(([code, data]) => {
                if (code !== 0) return;
                setResponders(data);
            })
            .catch((err) => null);
    };

    // hooks
    useEffect(() => {
        fetchResponders();
    }, []);

    return (
        <Page loading={false}>
            <AdminDashboardHeader title={"Add Mission"} hideActionButtons />
            <Formik
                initialValues={{
                    rideType: EMissionType.emergencyResponse,
                    status: EMissionStatus.active,
                    address: "",
                    totalEarning: 0,
                    description: "",
                    startTime: new Date(),
                    pendingResponderRequests: [],
                }}
                validationSchema={validation}
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
                            <Dropdown
                                fieldLabel="Mission Type"
                                showFieldLabel
                                label={capitalize(formik.values.rideType ?? "")}
                                options={Object.values(EMissionType).map((type) => ({
                                    label: capitalize(type),
                                    value: type,
                                }))}
                                onSelect={(index) => formik.setFieldValue("rideType", missionTypes[index])}
                            />
                            <FormikField label={"Address"} name={"address"} showLabel />
                            <FormikField label={"Description"} name={"description"} showLabel />
                            <FormikField
                                leftIcon={<span className={`h-full flex justify-center items-center text-purple-500 font-semibold border-r border-gray-300 w-8 rounded-l-md`}>₦</span>}
                                label={"Bill"}
                                name={"totalEarning"}
                                showLabel
                                type={"number"}
                            />
                            <Dropdown
                                fieldLabel="Mission Status"
                                showFieldLabel
                                label={capitalize(formik.values.status ?? "")}
                                options={Object.values(EMissionStatus).map((type) => ({
                                    label: capitalize(type),
                                    value: type,
                                }))}
                                onSelect={(index) => formik.setFieldValue("status", Object.values(EMissionStatus)[index])}
                            />
                            <FormikField label={"Start Time"} name={"startTime"} showLabel type={"datetime-local"} />
                            <div>
                                <SelectResponder
                                    onChange={(responder: IOption) => formik.setFieldValue("pendingResponderRequests", [...formik.values.pendingResponderRequests!, responder.value])}
                                    fieldLabel={"Assign Responders"}
                                    showFieldLabel
                                />
                                <div className={`mt-2 flex space-x-3`}>
                                    {formik.values.pendingResponderRequests!.map((r) => (
                                        <div className={`bg-indigo-600 rounded-xl pl-3 pr-7 py-1 text-sm font-medium text-white relative`}>
                                            {getResponderFromId(r)?.firstName} {getResponderFromId(r)?.lastName}
                                            <button onClick={() => formik.setFieldValue("pendingResponderRequests", formik.values.pendingResponderRequests!.filter((t) => t !== r))} className={`absolute top-2 right-2`}>
                                                <FaTimesCircle className={`text-sm text-white`} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
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
