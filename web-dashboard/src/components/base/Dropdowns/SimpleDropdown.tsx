import { Fragment, FunctionComponent, ReactNode, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { FieldDescription, Label } from "../InputField";

function classNames(...classes: Array<string>) {
    return classes.filter(Boolean).join(" ");
}

export interface IOption {
    label?: string;
    value: string | ReactNode;
    key?: any;
}

interface ISimpleDropdown {
    label?: string;
    options: Array<IOption>;
    onSelect?: (index: number) => void;
    fieldLabel?: string;
    showFieldLabel?: boolean;
    fieldDescription?: string;
}

export const Dropdown: FunctionComponent<ISimpleDropdown> = ({ label = "", options, onSelect, fieldDescription, fieldLabel, showFieldLabel }) => {
    // state
    const [selected, setSelected] = useState<string | ReactNode>(label ?? options.length > 0 ? options[0].label ?? options[0].value : "");

    // utils
    const handleSelect = (index: number) => {
        const selected = options[index];
        setSelected(selected.label ?? selected.value);
        onSelect && onSelect(index);
    };

    return (
        <div className={`w-full`}>
            {showFieldLabel && fieldLabel && (
                <>
                    <Label htmlFor={fieldLabel} text={fieldLabel ?? ""} className={"mb-1"} />
                    <FieldDescription htmlFor={fieldLabel} text={fieldDescription ?? ""} className={"mb-1"} />
                </>
            )}
            {label && <Label text={fieldLabel} htmlFor={fieldLabel} className={`sr-only`} />}
            <Menu as="div" className="relative block text-left">
                <div>
                    <Menu.Button className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                        {selected}
                        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
                            {options.map(({ label, value, key }, i) => (
                                <Menu.Item key={key ?? i}>
                                    {({ active }: { active: boolean }) => (
                                        <a onClick={() => handleSelect(i)} href="#" className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}>
                                            {label ?? value}
                                        </a>
                                    )}
                                </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};
