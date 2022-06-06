/* This example requires Tailwind CSS v2.0+ */
import { Fragment, FunctionComponent, ReactNode, useState } from "react";
import { Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";

export interface INotificationWithActionButtons {
    showImage?: boolean;
    imageURL?: string;
    title?: string;
    blurb?: string;
    onClose?: VoidFunction;
    buttons?: Array<ReactNode>;
    show: boolean;
    showBasicActionButtons?: boolean;
    onAccept?: VoidFunction;
    onReject?: VoidFunction;
}

export const NotificationWithActionButtons: FunctionComponent<INotificationWithActionButtons> = ({
    showImage,
    imageURL,
    title,
    blurb,
    onClose,
    buttons = [],
    show,
    showBasicActionButtons,
    onAccept,
    onReject,
}) => {
    return (
        <>
            {/* Global notification live region, render this permanently at the end of the document */}
            <div aria-live="assertive" className="fixed inset-0 top-0 lg:top-24 z-[40] flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start">
                <div className="w-full fixed inset-0 top-28 lg:static flex flex-col items-center space-y-4 sm:items-end">
                    {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                    <Transition
                        show={show}
                        as={Fragment}
                        enter="transform ease-out duration-300 transition"
                        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5">
                            <div className="p-4">
                                <div className="flex items-start">
                                    {showImage && (
                                        <div className="flex-shrink-0 pt-0.5">
                                            <img className="h-10 w-10 rounded-full" src={imageURL} alt={title} />
                                        </div>
                                    )}
                                    <div className="ml-3 w-0 flex-1">
                                        <p className="text-sm font-medium text-gray-900">{title}</p>
                                        <p className="mt-1 text-sm text-gray-500">{blurb}</p>
                                        <div className="mt-4 flex space-x-3">
                                            {showBasicActionButtons && (
                                                <>
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                        onClick={onAccept}
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                        onClick={onReject ?? onClose}
                                                    >
                                                        Decline
                                                    </button>
                                                    {buttons}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="ml-4 flex-shrink-0 flex">
                                        <button
                                            type="button"
                                            className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={onClose}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XIcon className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </>
    );
};
