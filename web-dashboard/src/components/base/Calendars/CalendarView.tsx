import moment from "moment";
import { FunctionComponent, useState } from "react";
import { Calendar, momentLocalizer, Event, View } from "react-big-calendar";

const localizer = momentLocalizer(moment);

interface IMonthCalendar {
    events?: Array<Event>;
    view?: View;
}

export const CalendarView: FunctionComponent<IMonthCalendar> = ({ events, view }) => {
    // vars
    const now = new Date().getTime();
    const start = new Date(now - 2 * 60 * 60 * 1000);
    const end = new Date(now - 1 * 60 * 60 * 1000);

    return (
        <div className={`w-full h-full`}>
            <Calendar
                onSelecting={(info) => {
                    console.log(info);
                    return true;
                }}
                popup
                toolbar
                view={view}
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "100%" }}
                onSelectEvent={console.log}
            />
        </div>
    );
};
