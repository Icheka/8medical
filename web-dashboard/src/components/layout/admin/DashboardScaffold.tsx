import { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BellIcon, MenuAlt2Icon, XIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { NavLink, Route, Routes } from "react-router-dom";
import { IMAGES } from "../../../assets/images";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { BiPhoneCall } from "react-icons/bi";
import { routes, _8MedicalLinks } from "../../../config";
import { FormatNigerianNumber } from "../../../utils";
import { Logo } from "../../brand";
import { AdminDashboardOverview, EnrolleePage, ResponderDetailsPage, EnrolleesPage, EarningsPage, VehiclesPage, AdminLogoutPage } from "../../../pages/Admin";
import { RespondersPage } from "../../../pages/Admin/Responders";
import { CreateEnrolleePage } from "../../../pages/Admin/CreateEnrolleePage";
import { useAdminAuth } from "../../../context";
import { IAdmin } from "../../../types/service-types";
import { Page } from "../Page";
import { CreateResponderPage } from "../../../pages/Admin/CreateResponderPage";

let navigation = [
    { name: "Overview", href: "", icon: IMAGES.DashboardOverview, current: false },
    { name: "Enrollees", href: "enrollees", icon: IMAGES.Riders, current: false },
    { name: "Responders", href: "responders", icon: IMAGES.Calendar, current: false },
    { name: "Vehicles", href: "vehicles", icon: IMAGES.DashboardOverview, current: false },
    { name: "Institutions", href: "institutions", icon: IMAGES.Riders, current: false },
    { name: "Earnings", href: "earnings", icon: IMAGES.Calendar, current: false },
];
const userNavigation = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#" },
];
const accountNavigation = [
    { name: "Settings", href: "settings", icon: IMAGES.Settings },
    { name: "Logout", href: "sign-out", icon: IMAGES.Logout },
];

function classNames(...classes: Array<string>) {
    return classes.filter(Boolean).join(" ");
}

export const AdminDashboardScaffold: FunctionComponent = () => {
    // vars
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAdminAuth();

    navigation = navigation.map((nav, i) => {
        nav.current = false;

        const path = location.pathname;

        if (i === 0 && path === "/admin/dashboard") {
            nav.current = true;
            return nav;
        }

        nav.current = path === "/admin/dashboard".concat(nav.href);
        return nav;
    });

    // state
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState<IAdmin>();

    // hooks
    useEffect(() => {
        setUser(auth?.user);
    }, [JSON.stringify(auth.user)]);

    if (!user) return <Page loading />;

    return (
        <Page loading={!user}>
            <div className={`bg-white p-6 h-screen`}>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="fixed inset-0 flex z-40 xl:hidden" onClose={setSidebarOpen}>
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
                            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
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
                                        <button type="button" className="ml-1 flex items-center justify-center h-10 w-10 rounded-full" onClick={() => setSidebarOpen(false)}>
                                            <span className="sr-only">Close sidebar</span>
                                            <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className={`scale-75 -ml-8`}>
                                    <Logo />
                                </div>
                                <div className="mt-5 flex-1 h-0 overflow-y-auto space-y-6">
                                    <nav className="px-2 space-y-10 flex-1">
                                        {navigation.map((item) => (
                                            <NavLink key={item.name} to={item.href}>
                                                <a
                                                    className={classNames(
                                                        item.current ? "bg-purple-100 text-purple-600" : "text-[#979797] hover:bg-indigo-600",
                                                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                                                    )}
                                                >
                                                    <span className={`w-6 h-6 flex items-center justify-center mr-4`}>
                                                        <item.icon />
                                                    </span>
                                                    {item.name}
                                                </a>
                                            </NavLink>
                                        ))}
                                    </nav>
                                    <nav className="px-4 space-y-3">
                                        <div className={`font-bold text-sm text-gray-800`}>Account</div>
                                        {accountNavigation.map(({ name, href, ...item }, i) => (
                                            <Link className={`flex items-center space-x-4`} to={href}>
                                                <item.icon />
                                                <span>{name}</span>
                                            </Link>
                                        ))}
                                    </nav>
                                    <nav className={`border-t pt-6 pb-8 absolute left-0 w-full bottom-0`}>
                                        <div className={`text-xs flex items-center space-x-3 pl-4`}>
                                            <div className={`flex justify-center items-center rounded-md bg-purple-500 p-[7px]`}>
                                                <BiPhoneCall className={`text-lg text-white`} />
                                            </div>
                                            <div>
                                                <div className={`text-red-500 italic font-semibold mb-1`}>Emergency Hotlines:</div>
                                                <div className={`text-indigo-700 flex items-center flex-col`}>
                                                    {_8MedicalLinks.emergencyHotlines.map((phone, i) => (
                                                        <a key={i} href={`tel:${phone}`} className={`underline`}>
                                                            {FormatNigerianNumber(phone, { withCountryCode: true })}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
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
                <div className="hidden overflow-hidden xl:flex xl:w-64 xl:flex-col xl:fixed xl:inset-y-0 mb-6 min-h-screen">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex flex-col flex-grow pt-5 bg-[#f7f7f7] rounded-xl overflow-y-auto mt-6 mr-6">
                        <div className={`transform scale-75 -ml-4`}>
                            <Logo />
                        </div>
                        <div className="mt-8 flex-1 flex flex-col relative">
                            <nav className="px-2 pb-4 space-y-5">
                                {navigation.map((item) => (
                                    <NavLink className={`block`} key={item.name} to={item.href}>
                                        <a
                                            className={classNames(
                                                item.current ? "bg-[#DFE0E2] text-purple-600" : "text-[#979797] hover:bg-indigo-600",
                                                "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                                            )}
                                        >
                                            <span className={`w-6 h-6 flex items-center justify-center mr-4`}>
                                                <item.icon />
                                            </span>
                                            {item.name}
                                        </a>
                                    </NavLink>
                                ))}
                            </nav>
                            <nav className={`px-4 mt-10 space-y-5`}>
                                <div className={`font-bold text-sm text-gray-800`}>Account</div>
                                {accountNavigation.map(({ name, href, ...item }, i) => (
                                    <Link className={`flex items-center space-x-4 text-[#979797] text-sm`} to={href} key={i}>
                                        <span className={`w-6 h-6 flex items-center justify-center`}>
                                            <item.icon />
                                        </span>
                                        <span>{name}</span>
                                    </Link>
                                ))}
                            </nav>
                            <nav className={`border-t pt-6 pb-8 absolute left-0 w-full bottom-0`}>
                                <div className={`text-xs flex items-center space-x-3 pl-4`}>
                                    <div className={`flex justify-center items-center rounded-md bg-purple-500 p-[7px]`}>
                                        <BiPhoneCall className={`text-lg text-white`} />
                                    </div>
                                    <div>
                                        <div className={`text-red-500 italic font-semibold mb-1`}>Emergency Hotlines:</div>
                                        <div className={`text-indigo-700 flex items-center flex-col`}>
                                            {_8MedicalLinks.emergencyHotlines.map((phone, i) => (
                                                <a key={i} href={`tel:${phone}`} className={`underline`}>
                                                    {FormatNigerianNumber(phone, { withCountryCode: true })}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="xl:pl-64 flex flex-col flex-1">
                    <div className="sticky top-0 z-10 flex-shrink-0 flex h-20 bg-[#f7f7f7] rounded-xl">
                        <button type="button" className="px-4 border-r border-gray-200 text-gray-500 xl:hidden" onClick={() => setSidebarOpen(true)}>
                            <span className="sr-only">Open sidebar</span>
                            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <div className="flex-1 px-4 flex justify-between py-4">
                            <div className="w-10/12 xl:w-8/12 flex rounded-lg overflow-hidden px-3 py-1 bg-white border border-[#C5C5C5]">
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
                            <div className="flex items-center xl:ml-6 divide-x divide-[#C5C5C5] space-x-4">
                                <button type="button" className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                </button>

                                {/* Profile dropdown */}
                                <div className="relative pl-3 hidden xl:block">
                                    <div>
                                        <div className="max-w-xsc flex items-center space-x-3 bg-transparent text-sm rounded-full">
                                            <span className={`overflow-hidden bg-gray-300 rounded-full`}>
                                                <img className="h-12 w-12 rounded-full" src={""} alt={`${user.firstName} ${user.lastName}`} />
                                            </span>
                                            <div className={`flex flex-col items-start`}>
                                                <div className={`text-[#343434] text-md font-bold line-clamp-2`}>{`${user!.firstName} ${user!.lastName}`}</div>
                                                <div className={`text-[#100DB1] text-sm uppercase`}>{"Administrator"}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <main>
                        <div className="mt-4 h-[85vh] overflow-y-scroll">
                            <div className="max-w-7xl mx-auto xl:px-4 sm:pl-5 md:pl-6 sm:pr-2">
                                {/* PAGE CONTENT  */}
                                <div className="py-4">
                                    <Routes>
                                        <Route index element={<AdminDashboardOverview />} />
                                        
                                        <Route path={`enrollees`} element={<EnrolleesPage />} />
                                        <Route path={`enrollees/add`} element={<CreateEnrolleePage />} />
                                        <Route path={`enrollees/details/:id`} element={<EnrolleePage />} />
                                        
                                        <Route path={`responders`} element={<RespondersPage />} />
                                        <Route path={`responders/add`} element={<CreateResponderPage />} />
                                        <Route path={`responders/details/:id`} element={<ResponderDetailsPage />} />
                                        
                                        <Route path={`vehicles`} element={<VehiclesPage />} />
                                        <Route path={`earnings`} element={<EarningsPage />} />
                                        <Route path={`sign-out`} element={<AdminLogoutPage />} />
                                    </Routes>
                                </div>
                                {/* END PAGE CONTENT  */}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </Page>
    );
};
