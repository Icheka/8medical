import { addDays, addMilliseconds, isWithinInterval } from "date-fns";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { DateRange, DateRangePicker, Range } from "react-date-range";
import { toast } from "react-toastify";
import { useResponder } from "../../../context";
import { useResponderAuth } from "../../../context/responder.auth";
import { useWindowWidth } from "../../../hooks";
import { ResponderCalendarService, ResponderMissionsService } from "../../../services";
import { EResponderCalendarEventType, IResponder, IResponderCalendar } from "../../../types/service-types";
import { PrimaryButton } from "../Buttons";
import { Modal } from "../Modal";

interface ISelectAvailability {
    showModal: boolean;
    onClose: VoidFunction;
}
interface IRange extends Range {
    saved?: boolean;
    default?: boolean;
}

export const SelectAvailability: FunctionComponent<ISelectAvailability> = ({ showModal, onClose }) => {
    // vars
    const colors = {
        selection: "rgb(61, 145, 255)",
        missions: "purple",
        available: "lightgreen",
    };
    const defaultSelection: IRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
        default: true,
    };
    const windowWidth = useWindowWidth();

    // state
    const auth = useResponderAuth();
    const [user, setUser] = useState<IResponder>();
    const [ranges, setRanges] = useState<Array<IRange>>([defaultSelection]);
    const [maxDate, setMaxDate] = useState<Date>();
    const [page, setPage] = useState(1);
    const [savedRanges, setSavedRanges] = useState<Array<Range>>([]);
    const [saving, setSaving] = useState(false);

    // utils
    const getModalWidth = useMemo(() => {
        if (windowWidth < 390) return "96%";
        if (windowWidth < 528) return "90%";
        if (windowWidth < 1024) return "380px";
        return "590px";
    }, [windowWidth]);
    const saveChanges = async () => {
        setSaving(true);

        const events: Array<Partial<IResponderCalendar>> = ranges
            .filter((range) => !range.default)
            .map((range) => ({
                end: range.endDate,
                start: range.startDate,
                title: "Available for missions",
                type: EResponderCalendarEventType.available,
            }));
        const [code, data] = await ResponderCalendarService.updateEvents(events);
        setSaving(false);

        if (code !== 0) return toast.error("An error occurred. Please, try again.");
        toast("Your calendar has been updated");
        onClose();
    };
    const getMaximumMonthAsDate = () => {
        const now = new Date();
        return addDays(now, 30);
        // const then = new Date();

        // then.setMonth((now.getMonth() % 10) + 1);
        // then.setDate(1);
        // then.setHours(0);
        // then.setMinutes(0);
        // then.setSeconds(0);
        // then.setMilliseconds(0);
        // then.setFullYear(then.getMonth() < now.getMonth() ? now.getFullYear() + 1 : now.getFullYear());

        // return addMilliseconds(then, -1);
    };
    const handleRangeSelect = (selection: Range) => {
        if (!(selection && selection.startDate && selection.endDate)) {
            return;
        }

        const { startDate, endDate, key } = selection;
        if (!startDate || !endDate) return;
        if (startDate.getTime() < addMilliseconds(new Date(), -1).getTime()) return;

        const [inRange, indexFoundIn] = isInPreviousSelection(startDate, endDate);
        if (!inRange) return setRanges([...ranges, { startDate, endDate, key, color: "blue" }]);

        const foundRange = ranges[indexFoundIn as number];
        const sortedRange = sortDatesDesc(startDate, endDate, foundRange.startDate!, foundRange.endDate!);
        const newRange: Range = {
            startDate: sortedRange[0],
            endDate: sortedRange[sortedRange.length - 1],
            key: foundRange.key,
            color: colors.selection,
        };
        const replacement = Array.from(ranges);
        replacement.splice(indexFoundIn!, 1, newRange);

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

        const eventsAsRanges: Array<Range & { saved?: boolean }> = savedEvents.map(({ start, end, ...event }) => ({
            startDate: new Date(start),
            endDate: new Date(end),
            key: "selection",
            color: event.type === EResponderCalendarEventType.mission ? "green" : colors.available,
            saved: true,
        }));

        if (eventsAsRanges.length > 0) setRanges(eventsAsRanges);
        setSavedRanges(eventsAsRanges);
    };
    const clearUnsavedSelections = () => {
        setRanges([defaultSelection, ...savedRanges]);
    };
    const clearAllSelections = () => {
        setRanges([defaultSelection]);
    };

    // hooks
    useEffect(() => {
        const user = auth.user;
        if (!user) return;

        setUser(user);
        fetchEvents();
    }, [JSON.stringify(auth.user)]);
    useEffect(() => {
        setMaxDate(getMaximumMonthAsDate());
    }, []);

    return (
        <>
            <Modal width={getModalWidth} isOpen={showModal} onClose={onClose}>
                <div className={`${page !== 1 && "hidden"}`}>
                    {/* <div className={`font-semibold text-lg text-purple-700`}>Step 1 of 2</div> */}
                    <div className={`text-purple-700 font-semibold mt-4 lg:mt-0`}>What days are you available in the next month?</div>
                    <div className={`text-gray-700 text-sm italic mb-5 break-normal`}>Tip: You can select a few days now and update your schedule later</div>
                    <div className={`hidden lg:block`}>
                        <DateRangePicker
                            onChange={(item) => handleRangeSelect(item.selection)}
                            editableDateInputs
                            moveRangeOnFirstSelection={false}
                            ranges={ranges}
                            direction={"horizontal"}
                            months={1}
                            minDate={addMilliseconds(new Date(), -1)}
                            maxDate={maxDate}
                            retainEndDateOnFirstSelection
                        />
                    </div>
                    <div className={`lg:hidden`}>
                        <DateRange
                            // <DateRangePicker
                            onChange={(item) => handleRangeSelect(item.selection)}
                            editableDateInputs
                            moveRangeOnFirstSelection={false}
                            ranges={ranges as Array<Range>}
                            direction={"horizontal"}
                            months={1}
                            minDate={addMilliseconds(new Date(), -1)}
                            maxDate={maxDate}
                            retainEndDateOnFirstSelection
                        />
                    </div>
                    <div>
                        <div>Colour codes</div>
                        <div>
                            {Object.entries(colors).map(([label, colour]) => (
                                <div className={`flex space-x-2 items-center`}>
                                    <div style={{ background: colour }} className={`w-4 h-4 rounded-sm`} />
                                    <div className={`text-gray-800`}>
                                        {label === "missions" && "days with either completed or scheduled missions (saved)"}
                                        {label === "available" && "days available (saved)"}
                                        {label === "selection" && "new selections (unsaved)"}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={`flex justify-between mt-8`}>
                        <div className={`flex flex-col space-y-4`}>
                            <PrimaryButton
                                onClick={clearUnsavedSelections}
                                className={`px-5 !rounded-0 py-1 bg-red-400 border-red-400 hover:bg-red-500 border-none outline-none`}
                                text={"Clear unsaved selections"}
                            />
                            <PrimaryButton
                                onClick={clearAllSelections}
                                className={`px-5 !rounded-0 py-1 bg-red-400 border-red-400 hover:bg-red-500 border-none outline-none`}
                                text={"Clear all selections"}
                            />
                        </div>
                        {/* {ranges.filter((range) => range.saved).length !== savedRanges.length ||
                            (ranges.length > 1 && ranges[0].default && savedRanges.length === 0 && (
                                <PrimaryButton loading={saving} onClick={saveChanges} className={`px-5 !rounded-0 py-1`} text={"Save"} />
                            ))} */}
                        <PrimaryButton loading={saving} onClick={saveChanges} className={`px-5 !rounded-0 py-1 max-h-8`} text={"Save"} />
                    </div>
                </div>

                <div className={`${page !== 2 && "hidden"}`}>
                    <div className={`font-semibold text-lg text-purple-700`}>Step 2 of 2</div>
                    <div className={`text-black font-semibold`}>What times are you available on those days?</div>
                    <div>
                        {ranges.map((range, i) => (
                            <Time key={i} range={range} onChange={() => null} />
                        ))}
                    </div>
                </div>
            </Modal>
        </>
    );
};

interface ITime {
    range: Range;
    onChange: (date: Date) => void;
}

const Time: FunctionComponent<ITime> = ({ range, onChange }) => {
    // state

    // utils
    const dateToString = (date: Date) => {
        const then = new Date(date);
        return `${then.getDate()}/${then.getMonth() + 1}/${then.getFullYear()}`;
    };

    return (
        <div>
            <div>
                {dateToString(range.startDate!)} - {dateToString(range.endDate!)}
            </div>
            <div>
                <div>
                    <div>Hour</div>
                    {/* <div><TimeInput /></div> */}
                </div>
            </div>
        </div>
    );
};

interface ITimeInput {
    value: number;
    onChange: (value: string) => void;
    limits: [number, number];
}

const TimeInput: FunctionComponent<ITimeInput> = ({ value, onChange, limits }) => <input className={``} value={value} onChange={(e) => onChange(e.target.value)} min={limits[0]} max={limits[1]} />;
