import { differenceInYears } from "date-fns";
import { Formik } from "formik";
import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Dropdown, FormikField, IInputField, IOption, PrimaryButton } from "../../components/base";
import { Page } from "../../components/layout";
import { ChangeableProfilePicture } from "../../components/profile-picture";
import { AdminRespondersService } from "../../services";
import { IResponder } from "../../types/service-types";


const genders: Array<IOption> = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
];

export const ResponderDetailsPage: FunctionComponent = () => {
    // vars
    const params = useParams();
    const id = params.id as string;

    // state
    const [responder, setResponder] = useState<IResponder>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // utils
    const fetchResponder = async () => {
        AdminRespondersService.fetchById(id)
            .then(([code, data]) => {
                if (code !== 0) return toast.error(data);
                setResponder(data);
            })
            .catch((err) => toast(err));
    };
    const handleSubmit = (values: Partial<IResponder>) => {
        if (values.dateOfBirth) values.dateOfBirth = new Date(values.dateOfBirth);
        
        setIsSubmitting(true);
        AdminRespondersService.updateById(id, values)
            .then(([code, data]) => {
                if (code !== 0) return toast.error(data);
                toast("Responder profile updated successfully!");
            })
            .catch((err) => null)
            .finally(() => setIsSubmitting(false));
    };
    const formatDate = (date?: Date) => {
        if (!date) return undefined;
        date = new Date(date);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    };
    const age = (date?: Date) => {
        if (!date) return;
        date = new Date(date);
        
        return differenceInYears(new Date(), date);
    };

    // hooks
    useEffect(() => {
        fetchResponder();
    }, []);

    if (!responder) return <Page loading />;

    return (
        <Page loading={false}>
            <Formik
                initialValues={{
                    firstName: responder?.firstName ?? "",
                    lastName: responder?.lastName ?? "",
                    dateOfBirth: formatDate(responder?.dateOfBirth) as unknown as Date,
                    gender: responder?.gender ?? "male",
                    email: responder?.email ?? "",
                    phone: responder?.phone ?? "",
                    address: responder?.address ?? "",
                    profilePicture: responder?.profilePicture,
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
                        <div className={`flex`}>
                            <ChangeableProfilePicture url={formik.values.profilePicture} onChange={(url) => formik.setFieldValue("profilePicture", url)} />
                        </div>
                        <div className={`space-y-3 mt-6`}>
                            <Input label="First Name" name={"firstName"} />
                            <Input label="Last Name" name={"lastName"} />
                            <Input type={"date"} label="Date of Birth" name={"dateOfBirth"} />
                            <Input label="Age" customValue={<div>{age(responder.dateOfBirth)}</div>} />
                            <Input
                                label="Gender"
                                customValue={
                                    <div className={`max-w-[200px]`}>
                                        <Dropdown
                                        onSelect={(index: number) => formik.setFieldValue("gender", genders[index].value)}
                                        label={formik.values.gender ? `${formik.values.gender.charAt(0).toUpperCase()}${formik.values.gender.slice(1)}` : undefined}
                                        options={genders}
                                    />
                                    </div>
                                }
                            />
                            <Input type={"email"} label="Email Address" name={"email"} />
                            <Input type={"tel"} label="Phone" name={"phone"} />
                            <Input label="Address" name={"address"} />
                        </div>
                        <div className={`flex justify-end mt-4`}>
                            <PrimaryButton type={"submit"} loading={isSubmitting} className={`px-5 py-1`} text={"Save Changes"} />
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
        <div className={`border border-purple-100 rounded-lg px-3 py-1 flex items-center justify-between`}>
            <div className={`font-medium text-purple-700`}>{label}</div>
            {customValue ?? (
                <div className={`border-b border-green-400`}>
                    <FormikField className={`text-indigo-700`} noBorder {...formikProps} />
                </div>
            )}
        </div>
    );
};
