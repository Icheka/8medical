import { Fragment, FunctionComponent, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { BellIcon, CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, MenuAlt2Icon, UsersIcon, XIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { NavLink, Route, Routes } from "react-router-dom";
import { CalendarPage, DashboardOverview, RidesPage } from "../../pages";
import { routes } from "../../config";
import { IMAGES } from "../../assets/images";
import { useNavigate, useLocation } from "react-router-dom";

let navigation = [
    { name: "Overview", href: "", icon: IMAGES.DashboardOverview, current: false },
    { name: "All Rides", href: "rides", icon: IMAGES.Riders, current: false },
    { name: "Calendar", href: "calendar", icon: IMAGES.Calendar, current: false },
];
const userNavigation = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#" },
];

function classNames(...classes: Array<string>) {
    return classes.filter(Boolean).join(" ");
}

export const DashboardScaffold: FunctionComponent = () => {
    // vars
    const navigate = useNavigate();
    const location = useLocation();

    navigation = navigation.map((nav, i) => {
        nav.current = false;

        const path = location.pathname;

        if (i === 0 && path === "/dashboard") {
            nav.current = true;
            return nav;
        }

        nav.current = path === "/dashboard/".concat(nav.href);
        return nav;
    });

    // state
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <div className={`bg-white p-6 min-h-screen`}>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                        </Transition.Child>
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-purple-700">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <span className="sr-only">Close sidebar</span>
                                            <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex-shrink-0 flex items-center px-4">
                                    <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg" alt="Workflow" />
                                </div>
                                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                                    <nav className="px-2 space-y-1">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? "bg-indigo-800 text-white" : "text-indigo-100 hover:bg-indigo-600",
                                                    "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                                                )}
                                            >
                                                <item.icon />
                                                {/* {item.name} */}
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </Transition.Child>
                        <div className="flex-shrink-0 w-14" aria-hidden="true">
                            {/* Dummy element to force sidebar to shrink to fit close icon */}
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden overflow-hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 mb-6 min-h-screen">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex flex-col flex-grow pt-5 bg-[#f7f7f7] rounded-xl overflow-y-auto mt-6 mr-6">
                        <div className="flex items-center flex-shrink-0 px-4 border-b pb-5">
                            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg" alt="Workflow" />
                        </div>
                        <div className="mt-8 flex-1 flex flex-col">
                            <nav className="flex-1 px-2 pb-4 space-y-5">
                                {navigation.map((item) => (
                                    <NavLink className={`block`} key={item.name} to={item.href}>
                                        <a
                                            className={classNames(
                                                item.current ? "bg-[#DFE0E2] text-purple-600" : "text-[#979797] hover:bg-indigo-600",
                                                "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                                            )}
                                        >
                                            <span className={`w-6 h-6 mr-6`}>
                                                <item.icon />
                                            </span>
                                            {item.name}
                                        </a>
                                    </NavLink>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="md:pl-64 flex flex-col flex-1">
                    <div className="sticky top-0 z-10 flex-shrink-0 flex h-20 bg-[#f7f7f7] rounded-xl">
                        <button
                            type="button"
                            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <div className="flex-1 px-4 flex justify-between py-4">
                            <div className="w-8/12 flex rounded-lg overflow-hidden px-3 py-1 bg-white border border-[#C5C5C5">
                                <form className="w-full flex md:ml-0" action="#" method="GET">
                                    <label htmlFor="search-field" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                                        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                                            <SearchIcon className="h-5 w-5" aria-hidden="true" />
                                        </div>
                                        <input
                                            id="search-field"
                                            className="block w-full h-full pl-8 lg:pl- pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent text-xs"
                                            placeholder="Search"
                                            type="search"
                                            name="search"
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="flex items-center md:ml-6 divide-x divide-[#C5C5C5] space-x-4">
                                <button type="button" className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                </button>

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative pl-3">
                                    <div>
                                        <Menu.Button className="max-w-xs flex items-center space-x-3 bg-transparent text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            <span className="sr-only">Open user menu</span>
                                            <span className={`overflow-hidden bg-gray-300 rounded-full`}>
                                                <img
                                                    className="h-12 w-12 rounded-full"
                                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                    alt=""
                                                />
                                            </span>
                                            <div className={`flex flex-col items-start`}>
                                                <div className={`text-[#343434] text-lg font-bold`}>Icheka Ozuru</div>
                                                <div className={`text-[#100DB1] text-md`}>Engineer</div>
                                            </div>
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
                                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {userNavigation.map((item) => (
                                                <Menu.Item key={item.name}>
                                                    {({ active }: { active: boolean }) => (
                                                        <a href={item.href} className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>
                                                            {item.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <main>
                        <div className="py-2">
                            <div className="max-w-7xl mx-auto px-4 sm:pl-5 md:pl-6 sm:pr-2">
                                {/* PAGE CONTENT  */}
                                <div className="py-4">
                                    <Routes>
                                        <Route index element={<DashboardOverview />} />
                                        <Route path={"rides"} element={<RidesPage />} />
                                        <Route path={"calendar"} element={<CalendarPage />} />
                                    </Routes>
                                </div>
                                {/* END PAGE CONTENT  */}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};
