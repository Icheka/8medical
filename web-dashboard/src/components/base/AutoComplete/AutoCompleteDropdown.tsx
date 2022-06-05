import { Fragment, FunctionComponent, ReactNode, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { IOption } from "../Dropdowns";
import { FieldDescription, Label } from "../InputField";

export interface IAutoCompleteDropdown {
    options: Array<IOption>;
    label?: string | ReactNode;
    onChange: (option: IOption) => void;
    fieldLabel?: string;
    showFieldLabel?: boolean;
    fieldDescription?: string;
}

export const AutoCompleteDropdown: FunctionComponent<IAutoCompleteDropdown> = ({ options, label, onChange, fieldDescription, fieldLabel, showFieldLabel }) => {
    const [selected, setSelected] = useState(label ?? options.length > 0 ? options[0].label ?? options[0].value : null);
    const [query, setQuery] = useState("");

    const filteredOptions = query === "" ? options : options.filter((option) => (option.label ?? "").toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, "")));

    return (
        <div>
            {showFieldLabel && fieldLabel && (
                <>
                    <Label htmlFor={fieldLabel} text={fieldLabel ?? ""} className={"mb-1"} />
                    <FieldDescription htmlFor={fieldLabel} text={fieldDescription ?? ""} className={"mb-1"} />
                </>
            )}
            {label && <Label text={fieldLabel} htmlFor={fieldLabel} className={`sr-only`} />}
            <Combobox
                value={selected}
                onChange={(option) => {
                    console.log(option);
                    setSelected(option);
                }}
            >
                <div className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                            displayValue={(option: any) => option}
                            // displayValue={(option: IOption) => (option ? option.label ?? "" : "")}
                            onChange={(event: any) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </Combobox.Button>
                    </div>
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" afterLeave={() => setQuery("")}>
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredOptions.length === 0 && query !== "" ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">Nothing found.</div>
                            ) : (
                                filteredOptions.map((option, i) => (
                                    <Combobox.Option
                                        key={option.key ?? String(option.value)}
                                        className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-teal-600 text-white" : "text-gray-900"}`}
                                        value={option.label}
                                        onClick={() => onChange(option)}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{option.label}</span>
                                                {selected ? (
                                                    <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-teal-600"}`}>
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
};
