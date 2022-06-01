import { Fragment, FunctionComponent } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

function classNames(...classes: Array<string>) {
    return classes.filter(Boolean).join(" ");
}

interface IDateFilter {
    label: string;
}

export const DateFilter: FunctionComponent<IDateFilter> = ({ label }) => {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-3 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    {label}
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {/* <Menu.Item> */}
                        <input type={"datetime-local"} />
                        {/* </Menu.Item> */}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

const DatePicker: FunctionComponent = () => {
    return <input type={"date"} />;
};
