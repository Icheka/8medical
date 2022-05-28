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
    // events = [
    //     {
    //         start,
    //         end,
    //         title: "Lunch with Icheka",
    //     },
    //     {
    //         start,
    //         end,
    //         title: "Dinner with Gamal",
    //     },
    //     {
    //         start: new Date(start.getTime() + 27 * 60 * 60 * 1000),
    //         end: new Date(end.getTime() + 30 * 60 * 60 * 1000),
    //         title: "Dinner with Ibukun",
    //     },
    // ];

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
