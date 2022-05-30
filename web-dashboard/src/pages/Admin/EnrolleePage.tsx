import { FunctionComponent, ReactNode } from "react";
import { PrimaryButton } from "../../components/base";
import { AdminDashboardHeader, Page } from "../../components/layout";
import { ChangeableProfilePicture } from "../../components/profile-picture";

export const EnrolleePage: FunctionComponent = () => {
    return (
        <Page loading={false}>
            <div>
                <AdminDashboardHeader title="Enrolle Detail" />
                <div className={`border rounded-lg p-3`}>
                    <div>
                        <ChangeableProfilePicture size={"w-[170px] h-[170px]"} />
                    </div>
                    <div className={`space-y-2 mt-5`}>
                        <Row>
                            <Label text={"First Name"} />
                            <Value text={"John Doe"} />
                        </Row>
                        <Row>
                            <Label text={"Last Name"} />
                            <Value text={"John Doe"} />
                        </Row>
                        <Row>
                            <Label text={"Date of Birth"} />
                            <Value text={"John Doe"} />
                        </Row>
                        <Row>
                            <Label text={"Gender"} />
                            <Value text={"John Doe"} />
                        </Row>
                        <Row>
                            <Label text={"Blood Group"} />
                            <Value text={"John Doe"} />
                        </Row>
                        <Row>
                            <Label text={"Age"} />
                            <Value text={"John Doe"} />
                        </Row>
                        <Row>
                            <Label text={"Email Address"} />
                            <Value text={"John Doe"} />
                        </Row>
                        <Row>
                            <Label text={"Phone Number"} />
                            <Value text={"John Doe"} />
                        </Row>
                        <Row>
                            <Label text={"Plan"} />
                            <Value text={"John Doe"} />
                        </Row>
                    </div>
                    <div className={`flex justify-end mt-4`}>
                        <PrimaryButton className={`px-4 py-1`} text={"Add Dependent"} />
                    </div>
                </div>
            </div>
        </Page>
    );
};

interface ILabel {
    text?: string;
}

const Label: FunctionComponent<ILabel> = ({ text }) => <div className={`font-medium text-md`}>{text}</div>;

interface IValue {
    text?: string;
}

const Value: FunctionComponent<IValue> = ({ text }) => <div className={`font-normal text-sm`}>{text}</div>;

interface IRow {
    children: Array<ReactNode>;
}

const Row: FunctionComponent<IRow> = ({ children }) => <div className={`flex justify-between items-center bg-purple-50/70 px-3 py-2 rounded-lg`}>{children}</div>;
