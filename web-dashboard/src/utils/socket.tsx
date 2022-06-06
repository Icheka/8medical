import { FunctionComponent, ReactNode, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Socket } from "socket.io-client";
import { useImmer } from "use-immer";
import { IMAGES } from "../assets/images";
import { NotificationWithActionButtons } from "../components/base/Toasts";
import { routes } from "../config";
import { useResponderAuth } from "../context";
import { ResponderMissionsService } from "../services";
import { IMission } from "../types/service-types";
import { INotification } from "../types/service-types/Notification";

export interface INotificationsHandler {
    io: Socket;
}

export const NotificationsHandler: FunctionComponent<INotificationsHandler> = ({ io }) => {
    // vars
    const navigate = useNavigate();

    // state
    const { setNotifications, notifications, user } = useResponderAuth();
    const [toasts, setToasts] = useImmer<Array<ReactNode>>([]);

    // utils
    const runSocketClient = (io: Socket) => {
        io.on("connection", () => {
            console.log("Socket client connected to server!");
        });

        io.on("new mission", (data: INotification) => {
            console.log("Received IO for new mission", data.payload);
            if (!data.payload.pendingResponderRequests.includes(user?._id)) return;

            const key = new Date().getTime();
            console.log("pre ->", notifications);

            setNotifications([
                {
                    ...data,
                    key,
                    onClose: () => {
                        setNotifications(notifications.filter((d) => d.key !== key));
                    },
                },
                ...notifications,
            ]);
            console.log("Pushed to notifications", notifications.length);
        });
    };
    const acceptMission = async (mission: IMission, closeToast: VoidFunction) => {
        let { _id: missionId } = mission;

        ResponderMissionsService.accept(missionId)
            .then(([code, data]) => {
                if (code !== 0) return toast.error(data);
                toast(`You are now confirmed for this mission!`);
                closeToast();
            })
            .catch((err) => null);
    };
    const useToasts = () =>
        useMemo(() => {
            console.log("Returning memoised toasts", notifications.length);
            return notifications.map((n) => {
                if (n.name === "new mission") {
                    return (
                        <div onClick={() => navigate(`${routes.responder.ridesPage}/${n.payload._id}`)}>
                            <NotificationWithActionButtons
                                show
                                blurb={
                                    <div>
                                        <strong>Address:</strong> {n.payload.address}
                                        <br />
                                        <strong>Description:</strong> {n.payload.description}
                                        <br />
                                        <strong>Type:</strong> {capitalize(n.payload.rideType)}
                                    </div>
                                }
                                title={"New mission!"}
                                showImage
                                imageURL={IMAGES.Logo}
                                onClose={n.onClose}
                                onReject={n.onClose}
                                onAccept={() => acceptMission(n.payload as IMission, n.onClose!)}
                                showBasicActionButtons
                                key={n.key}
                                buttons={[
                                    <Link to={`${routes.responder.ridesPage}/${n.payload._id}`}>
                                        <span className={`text-indigo-700 pt-3 font-semibold text-md underline`}>View</span>
                                    </Link>,
                                ]}
                            />
                        </div>
                    );
                }
            });
        }, [notifications.length]);

    // hooks
    useEffect(() => {
        runSocketClient(io);
    }, []);
    useEffect(() => {
        console.log("notifications updated :>>", notifications.length, notifications);
    }, [notifications.length]);

    // return null;
    return <>{useToasts()}</>;
};
