import { addMilliseconds, isWithinInterval } from "date-fns";
import { FunctionComponent, useEffect, useState } from "react";
import { DateRange, DateRangePicker, Range } from "react-date-range";
import { useResponder } from "../../../context";
import { ResponderCalendarService, ResponderMissionsService } from "../../../services";
import { EResponderCalendarEventType, IResponder, IResponderCalendar } from "../../../types/service-types";
import { PrimaryButton } from "../Buttons";
import { Modal } from "../Modal";

interface ISelectAvailability {
    showModal: boolean;
    onClose: VoidFunction;
}

export const SelectAvailability: FunctionComponent<ISelectAvailability> = ({ showModal, onClose }) => {
    // vars
    const colors = {
        selection: "rgb(61, 145, 255)",
        missions: "purple",
        available: "lightgreen",
    };

    // state
    const responderContext = useResponder();
    const [user, setUser] = useState<IResponder>();
    const [ranges, setRanges] = useState<Array<Range>>([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    // utils
    const handleRangeSelect = (selection: Range) => {
        if (!(selection && selection.startDate && selection.endDate)) {
            console.log("ghost selection", selection);
            return;
        }
        const { startDate, endDate, key } = selection;
        if (!startDate || !endDate) return;
        if (startDate.getTime() < addMilliseconds(new Date(), -1).getTime()) return;
        console.log("end ->", startDate, endDate);

        const [inRange, indexFoundIn] = isInPreviousSelection(startDate, endDate);
        if (!inRange) return setRanges([...ranges, { startDate, endDate, key, color: "blue" }]);

        console.log("in range");

        const foundRange = ranges[indexFoundIn as number];
        const sortedRange = sortDatesDesc(startDate, endDate, foundRange.startDate!, foundRange.endDate!);
        console.log("sorted range", sortedRange);
        const newRange: Range = {
            startDate: sortedRange[0],
            endDate: sortedRange[sortedRange.length - 1],
            key: foundRange.key,
            color: colors.selection,
        };
        console.log("new range", newRange, indexFoundIn);
        const replacement = Array.from(ranges);
        replacement.splice(indexFoundIn!, 1, newRange);
        console.log("replacement", ranges, replacement);
        setRanges(replacement);
    };
    const isInPreviousSelection = (...dates: Array<Date>): [boolean, number | null] => {
        // checks whether a date has been selected before
        for (const range of ranges) {
            for (const date of dates)
                if (isWithinInterval(date, { start: range.startDate!, end: range.endDate! })) return [true, ranges.map((range) => range.startDate?.getTime()).indexOf(range.startDate?.getTime())];
        }
        return [false, null];
    };
    const sortDatesDesc = (...dates: Array<Date | number>): Array<Date> => {
        const datesAsNumbers: Array<number> = dates.map((date) => new Date(date).getTime());
        const sorted = datesAsNumbers.sort();
        return sorted.map((timestamp) => new Date(timestamp));
    };
    const fetchEvents = async () => {
        const [code, data] = await ResponderCalendarService.fetchAll();
        if (code !== 0) return;

        const savedEvents = (data as Array<IResponderCalendar>).filter((event) => event.type !== EResponderCalendarEventType.unavailable);

        const eventsAsRanges: Array<Range> = savedEvents.map(({ start, end, ...event }) => ({
            startDate: new Date(start),
            endDate: new Date(end),
            key: "selection",
            color: event.type === EResponderCalendarEventType.mission ? "green" : colors.available,
        }));
        console.log(eventsAsRanges);
        setRanges(eventsAsRanges);
    };

    // hooks
    useEffect(() => {
        const user = responderContext?.currentResponder?.user;
        if (!user) return;

        setUser(user);
        fetchEvents();
    }, [JSON.stringify(responderContext?.currentResponder?.user)]);

    return (
        <Modal width={"964px"} isOpen={showModal} onClose={onClose}>
            <div>
                <div>What days are you available?</div>
                <DateRangePicker
                    onChange={(item) => handleRangeSelect(item.selection)}
                    editableDateInputs
                    moveRangeOnFirstSelection={false}
                    ranges={ranges}
                    direction={"horizontal"}
                    months={2}
                    minDate={addMilliseconds(new Date(), -1)}
                />
                <div className={`flex justify-end`}>
                    <PrimaryButton className={`px-5 !rounded-0 py-1`} text={"Save"} />
                </div>
            </div>
        </Modal>
    );
};
