import { FunctionComponent, useEffect, useState } from "react";
import { Event, View } from "react-big-calendar";
import { ResponderCalendarService } from "../../../services";
import { IResponderCalendar } from "../../../types/service-types";
import { PrimaryButton } from "../Buttons";
import { CalendarView } from "./CalendarView";
import { SelectAvailability } from "./SelectAvailability";

interface IResponderCalendarView {
    view?: View;
}

export const ResponderCalendar: FunctionComponent<IResponderCalendarView> = ({ view }) => {
    // state
    const [events, setEvents] = useState<Array<Event>>([]);
    const [showSelectAvailaibilty, setShowSelectAvailaibilty] = useState(false);

    // utils
    const fetchEvents = async () => {
        const [code, data] = await ResponderCalendarService.fetchAll();
        if (code !== 0) return;
        setEvents(extractEvents(data));
    };
    const extractEvents = (events: Array<IResponderCalendar>) => {
        const extracted: Array<Event> = events.map(({ _id, end, start, title, type }) => ({
            start: new Date(start),
            end: new Date(end),
            title,
            resource: {
                type,
            },
        }));

        return extracted;
    };
    const handleSelectAvailabilityClose = () => {
        setShowSelectAvailaibilty(false);
        fetchEvents();
    };

    // hooks
    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className={`w-full h-full`}>
            <div className={`mb-4`}>
                <PrimaryButton onClick={() => setShowSelectAvailaibilty(true)} className={`px-3 py-1`} text={"Select availability"} />
            </div>
            <div className={`h-[310px] lg:h-full`}>
                <CalendarView events={events} />
            </div>
            <SelectAvailability showModal={showSelectAvailaibilty} onClose={handleSelectAvailabilityClose} />
        </div>
    );
};
