import { FunctionComponent } from "react";
import { ResponderCalendar } from "../components/base/Calendars";

export const CalendarPage: FunctionComponent = () => {
    return (
        <div>
            <div className={`h-screen `}>
                <ResponderCalendar />
            </div>
        </div>
    );
};
