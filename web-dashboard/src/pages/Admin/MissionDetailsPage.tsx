import { capitalize } from "capitalization";
import { Formik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Dropdown, FormikField, IInputField, IOption, Label, PrimaryButton } from "../../components/base";
import { SelectResponder } from "../../components/base/AutoComplete";
import { AdminDashboardHeader, Page } from "../../components/layout";
import { AdminMissionsService, AdminRespondersService } from "../../services";
import { EMissionStatus, EMissionType, IMission, IResponder } from "../../types/service-types";
import { formatDateForDateTimeString } from "../../utils";

export const AdminMissionDetailsPage: FunctionComponent = () => {
    // vars
    const { id } = useParams();

    // state
    const [mission, setMission] = useState<IMission>();
    const [loading, setLoading] = useState(true);
    const [responders, setResponders] = useState<Array<IResponder>>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // utils
    const fetchData = async () => {
        const [code, data] = await AdminMissionsService.fetchById(id!);
        setLoading(false);

        if (code !== 0) return toast.error(data);
        setMission(data);
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
    const handleSave = async (values: IMission) => {
        if (values.startTime) values.startTime = new Date(values.startTime);
        if (values.endTime) values.endTime = new Date(values.endTime);

        setIsSubmitting(true);
        const [code, data] = await AdminMissionsService.updateById(id!, values);
        setIsSubmitting(false);

        if (code !== 0) return toast.error(data);
        toast("Mission updated successfully!");
    };

    // hooks
    useEffect(() => {
        fetchData();
        fetchResponders();
    }, []);

    if (!mission) return <Page loading />;

    return (
        <Page loading={loading}>
            <AdminDashboardHeader title={"Mission Details"} hideActionButtons />
            <Formik
                initialValues={{
                    ...mission,
                    startTime: formatDateForDateTimeString(new Date(mission.startTime)) as unknown as Date,
                    endTime: mission.endTime ? (formatDateForDateTimeString(new Date(mission.endTime)) as unknown as Date) : undefined,
                }}
                onSubmit={handleSave}
            >
                {(formik) => (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                        }}
                    >
                        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-6`}>
                            <Input name={"description"} label={"Description"} />
                            <Input name={"address"} label={"Location"} />
                            <Dropdown
                                options={Object.entries(EMissionType).map(([k, v]) => ({
                                    value: v,
                                    label: capitalize(k),
                                }))}
                                fieldLabel={"Mission Type"}
                                showFieldLabel
                                label={formik.values.rideType ?? "Type"}
                                onSelect={(i) => formik.setFieldValue("rideType", Object.values(EMissionType)[i])}
                            />
                            <Dropdown
                                options={Object.entries(EMissionStatus).map(([k, v]) => ({
                                    value: v,
                                    label: capitalize(k),
                                }))}
                                fieldLabel={"Status"}
                                showFieldLabel
                                label={formik.values.status ?? "Status"}
                                onSelect={(i) => formik.setFieldValue("status", Object.values(EMissionStatus)[i])}
                            />
                            <FormikField name={"startTime"} type={"datetime-local"} label={"Starts at"} showLabel />
                            {formik.values.endTime && <FormikField name={"endTime"} type={"datetime-local"} label={"Ended at"} showLabel />}
                            <Input
                                name={"totalEarning"}
                                type={"number"}
                                label={"Bill"}
                                leftIcon={<span className={`h-full flex justify-center items-center text-purple-500 font-semibold border-r border-gray-300 w-8 rounded-l-md`}>₦</span>}
                            />
                            <div>
                                <SelectResponder
                                    onChange={(responder: IOption) => formik.setFieldValue("pendingResponderRequests", [...formik.values.pendingResponderRequests!, responder.value])}
                                    fieldLabel={"Assign Responders"}
                                    showFieldLabel
                                    fieldDescription="New assignees will be notified and can accept/reject this mission"
                                />
                                <div className={`mt-2 flex space-x-3`}>
                                    {formik.values.pendingResponderRequests!.map((r) => (
                                        <div className={`bg-indigo-600 rounded-xl pl-3 pr-7 py-1 text-sm font-medium text-white relative`}>
                                            {getResponderFromId(r)?.firstName} {getResponderFromId(r)?.lastName}
                                            <button
                                                onClick={() =>
                                                    formik.setFieldValue(
                                                        "pendingResponderRequests",
                                                        formik.values.pendingResponderRequests!.filter((t) => t !== r)
                                                    )
                                                }
                                                className={`absolute top-2 right-2`}
                                            >
                                                <FaTimesCircle className={`text-sm text-white`} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {formik.values.confirmedResponderRequests.length !== 0 && (
                                <div>
                                    <Label text={"Confirmed responders"} />
                                    <div className={`mt-2 flex space-x-3`}>
                                        {formik.values.confirmedResponderRequests!.map((r) => (
                                            <div className={`bg-indigo-600 rounded-xl pl-3 pr-7 py-1 text-sm font-medium text-white relative`}>
                                                {getResponderFromId(r)?.firstName} {getResponderFromId(r)?.lastName}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className={`flex justify-between mt-12`}>
                            {!formik.values.endTime && (
                                <PrimaryButton
                                    onClick={() => formik.setFieldValue("endTime", formatDateForDateTimeString(new Date()))}
                                    className={"px-4 py-1 !bg-red-600 hover:bg-red-500 border-red-600 hover:border-red-500"}
                                    text={"Mark Mission as Completed"}
                                    type={"button"}
                                />
                            )}
                            <PrimaryButton loading={isSubmitting} className={"px-4 py-1"} text={"Save Changes"} type={"submit"} />
                        </div>
                    </form>
                )}
            </Formik>
        </Page>
    );
};

interface IInput extends IInputField {
    customValue?: any;
}

const Input: FunctionComponent<IInput> = ({ customValue, label, ...formikProps }) => {
    return (
        <div className={`border border-purple-100 rounded-lg px-3 py-1 flex items-center justify-between max-h-[51px]`}>
            <div className={`font-medium text-purple-700`}>{label}</div>
            {customValue ?? (
                <div className={`border-b border-green-400`}>
                    <FormikField className={`text-indigo-700`} noBorder {...formikProps} />
                </div>
            )}
        </div>
    );
};
