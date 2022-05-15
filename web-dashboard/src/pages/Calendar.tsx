import { FunctionComponent } from "react";
import { CalendarView } from "../components/base";

export const CalendarPage: FunctionComponent = () => {
    return (
        <div>
            <div className={`h-screen `}>
                <CalendarView />
            </div>
        </div>
    );
};
