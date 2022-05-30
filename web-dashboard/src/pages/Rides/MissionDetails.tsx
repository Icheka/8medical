import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PrimaryButton, StripedTable } from "../../components/base";
import { DashboardHeader, Page } from "../../components/layout";
import { ResponderMissionsService } from "../../services";
import { IMission } from "../../types/service-types";

export const MissionDetails: FunctionComponent = () => {
    // vars
    const headers = ["Time", "Location", "Amount Earned", "Date", "Description"];
    const { id } = useParams();

    // state
    const [mission, setMission] = useState<IMission>();
    const [loading, setLoading] = useState(true);

    // utils
    const fetchData = async () => {
        const [code, data] = await ResponderMissionsService.fetchMissionDetails(id!);
        setLoading(false);

        if (code !== 0) return toast.error(data);
        setMission(data);
    };

    // hooks
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Page loading={loading}>
            <div>
                <DashboardHeader title={"Mission Detail"} />
                {mission && (
                    <div className={`space-y-10`}>
                        <div className={`space-y-2`}>
                            <Row>
                                <Label text={"Time"} />
                                <Value text={new Date(mission.startTime).toLocaleTimeString("en-GB", { hour12: true })} />
                            </Row>
                            <Row>
                                <Label text={"Location"} />
                                <Value text={mission.address} />
                            </Row>
                            <Row>
                                <Label text={"Amount Earned"} />
                                <Value text={""} />
                            </Row>
                            <Row>
                                <Label text={"Date"} />
                                <Value
                                    text={new Date(mission.startTime).toLocaleDateString("en-GB", {
                                        dateStyle: "full",
                                    })}
                                />
                            </Row>
                            <Row>
                                <Label text={"Description"} />
                                <Value text={mission.description} />
                            </Row>
                        </div>
                        <div className={`grid grid-cols-2 h-60 space-x-4`}>
                            <div className={`border rounded-lg px-2 py-2 border-purple-500`}>
                                <div className={`pb-1 text-sm font-semibold`}>Add Notes</div>
                                <div className={`mb-2 border rounded-lg border-purple-200`}>
                                    <textarea
                                        className={
                                            "!border-none focus:border-none !shadow-none focus:shadow-none border-transparent w-full resize-none h-40 ring-0 focus:ring-0 !outline-none focus:outline-none"
                                        }
                                    />
                                </div>
                                <div className={`flex justify-end`}>
                                    <PrimaryButton text={"Save"} className={"px-3 py-0.5"} />
                                </div>
                            </div>
                            <div className={`w-full border bg-gray-100 h-full`}></div>
                        </div>
                    </div>
                )}
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
