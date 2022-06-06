import { addHours, isAfter, isBefore, isEqual } from "date-fns";
import { FunctionComponent, ReactNode, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PrimaryButton, StripedTable } from "../../components/base";
import { DashboardHeader, Page } from "../../components/layout";
import { routes } from "../../config";
import { useResponderAuth } from "../../context";
import { ResponderMissionsService } from "../../services";
import { IMission } from "../../types/service-types";

export const MissionDetails: FunctionComponent = () => {
    // vars
    const navigate = useNavigate();
    const headers = ["Time", "Location", "Amount Earned", "Date", "Description"];
    const { id } = useParams();

    // state
    const [mission, setMission] = useState<IMission>();
    const [loading, setLoading] = useState(true);
    const [note, setNote] = useState("");
    const { user } = useResponderAuth();

    // utils
    const fetchData = async () => {
        const [code, data] = await ResponderMissionsService.fetchMissionDetails(id!);
        setLoading(false);

        if (code !== 0) return toast.error(data);
        setMission(data);

        ResponderMissionsService.getNote(data._id)
            .then(([code, data]) => {
                if (code !== 0) return;
                setNote(data.text);
            })
            .catch(() => null);
    };
    const status = useMemo(() => {
        if (!mission || !mission.startTime) return "";
        const start = new Date(mission!.startTime);
        const end = mission?.endTime ? new Date(mission?.endTime) : null;
        const now = new Date();

        if (isBefore(now, start)) return "Scheduled";
        if (end === null || isBefore(end, now)) return "In Progress";
        return "Completed";
    }, [mission?.startTime, mission?.endTime]);
    const saveNote = () => {
        setLoading(true);
        ResponderMissionsService.addNote(mission!._id, note)
            .then(([code, data]) => {
                if (code !== 0) return toast.error(data);
                toast("Your notes have been updated successfully!");
            })
            .catch(() => null)
            .finally(() => setLoading(false));
    };
    const rejectMission = async () => {
        setLoading(true);
        ResponderMissionsService.reject(mission!._id)
            .then(([code, data]) => {
                if (code !== 0) return toast.error(data);
                toast("You are no longer assigned to this mission");
                navigate(routes.responder.ridesPage);
            })
            .catch(() => null)
            .finally(() => setLoading(false));
    };
    const acceptMission = async () => {
        setLoading(true);
        ResponderMissionsService.accept(mission!._id)
            .then(([code, data]) => {
                if (code !== 0) return toast.error(data);
                toast("You are now assigned to this mission");
            })
            .catch(() => null)
            .finally(() => setLoading(false));
    };
    const isAccepted = useMemo(() => {
        if (!mission) return false;
        return mission?.confirmedResponderRequests.includes(user?._id!);
    }, [mission?.confirmedResponderRequests.length]);

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
                                <Label text={"Description"} />
                                <Value text={mission.description} />
                            </Row>
                            <Row>
                                <Label text={"Location"} />
                                <Value text={mission.address} />
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
                                <Label text={"Time"} />
                                <Value text={new Date(mission.startTime).toLocaleTimeString("en-GB", { hour12: true })} />
                            </Row>
                            {isAccepted && (
                                <>
                                    <Row>
                                        <Label text={"Amount Earned"} />
                                        <Value text={""} />
                                    </Row>
                                    <Row>
                                        <Label text={"Status"} />
                                        <Value text={status} />
                                    </Row>
                                </>
                            )}
                            {!isAccepted && (
                                <div className={`w-full flex justify-end pt-3 space-x-3`}>
                                    <PrimaryButton onClick={acceptMission} className={`px-4 py-1 !border-none`} text={"Accept Mission"} />
                                    <PrimaryButton onClick={() => navigate(-1)} className={`px-4 py-1 !border-none !bg-red-500 hover:bg-red-400`} text={"Reject Mission"} />
                                </div>
                            )}
                            {status === "Scheduled" && isAccepted && (
                                <div className={`w-full flex justify-end pt-3`}>
                                    <PrimaryButton onClick={rejectMission} className={`px-4 py-1 !border-none !bg-red-500 hover:bg-red-400`} text={"Reject Mission"} />
                                </div>
                            )}
                        </div>
                        <div className={`grid grid-cols-1 lg:grid-cols-2 h-60 space-x-4`}>
                            <div className={`w-full border bg-gray-100 h-full hidden lg:block invisible`}></div>
                            {status !== "Scheduled" && isAccepted && (
                                <div className={`border rounded-lg px-2 py-2 border-purple-500`}>
                                    <div className={`pb-1 text-sm font-semibold`}>Add Notes</div>
                                    <div className={`mb-2 border rounded-lg border-purple-200`}>
                                        <textarea
                                            className={
                                                "!border-none focus:border-none !shadow-none focus:shadow-none border-transparent w-full resize-none h-40 ring-0 focus:ring-0 !outline-none focus:outline-none"
                                            }
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                        />
                                    </div>
                                    <div className={`flex justify-end`}>
                                        <PrimaryButton onClick={saveNote} type={"submit"} text={"Save"} className={"px-3 py-0.5"} />
                                    </div>
                                </div>
                            )}
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

const Row: FunctionComponent<IRow> = ({ children }) => <div className={`flex justify-between items-center space-x-4 bg-purple-50/70 px-3 py-2 rounded-lg`}>{children}</div>;
