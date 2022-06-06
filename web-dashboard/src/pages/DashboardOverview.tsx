import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IMAGES } from "../assets/images";
import { CalendarView, Card, PrimaryButton, ResponderCalendar, UnderlinedButton } from "../components/base";
import { EarningsLiteTable, RidesTable } from "../components/domains";
import { DashboardHeader } from "../components/layout";
import { routes } from "../config";
import { useResponder } from "../context";

export const DashboardOverview: FunctionComponent = () => {
    // vars
    const navigate = useNavigate();

    return (
        <div>
            <DashboardHeader title={"Dashboard Overview"} />
            <div className={`flex flex-col lg:flex-row justify-between items-start w-full gap-y-4 sm:gap-y-0 sm:gap-x-4 h-full `}>
                <div className={`flex order-2 lg:order-1 flex-col justify-between items-start w-full lg:w-7/12 xl:w-8/12 space-y-6`}>
                    <div className={`hidden  lg:flex flex-col xl:flex-row justify-between items-start w-full gap-y-2 xl:gap-y-0 xl:gap-x-4`}>
                        <BalanceCard label="Balance" value={0} icon={IMAGES.AccountBalance} background={"blue"} />
                        <BalanceCard label="Total Earned" value={0} icon={IMAGES.MoneyWithdrawn} background={"green"} />
                        <BalanceCard label="Total Withdrawn" value={0} icon={IMAGES.MoneyEarned} background={"red"} />
                    </div>
                    <div className={`h-full xl:max-h-[570px] w-full`}>
                        <Card className={`w-full h-full !p-0 !rounded-xl`}>
                            <div className={`py-4`}>
                                <div onClick={() => navigate(routes.responder.ridesPage)} className={`flex px-4 pb-4 justify-between items-center border-b border-[#e2e8ef]`}>
                                    <span className={`font-bold text-[#4F03A4] text-2xl`}>Missions</span>
                                    <UnderlinedButton text={"View all"} />
                                </div>
                                <div className={`xl:-mx-1 pt-0 -mt-2`}>
                                    <RidesTable limitRows={6} />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
                <div className={`w-full order-1 xl:order-2 lg:w-5/12 xl:w-4/12 space-y-4 lg:space-y-0 `}>
                    <div className={`flex lg:hidden flex-col  justify-between items-start w-full space-y-2 sm:space-y-3 h-64`}>
                        <BalanceCard label="Balance" value={0} icon={IMAGES.AccountBalance} background={"blue"} />
                        <BalanceCard label="Total Earned" value={0} icon={IMAGES.MoneyWithdrawn} background={"green"} />
                        <BalanceCard label="Total Withdrawn" value={0} icon={IMAGES.MoneyEarned} background={"red"} />
                    </div>
                    <div className={``}>
                        <Card className={`w-full !h-full bg-purple-100 p-4 !rounded-xl`}>
                            <div className={`overflow-hidden`}>
                                <div className={`-mt-[80px] h-[350px] md:-mt-[40px] lg:h-[360px] lg:-mt-[80px] xl:-mt-[80px] xl:h-[340px] w-full`}>
                                    <ResponderCalendar />
                                </div>
                            </div>
                            <div className={`flex justify-end mt-3`}>
                                <Link to={routes.responder.calendarPage}>
                                    <PrimaryButton className={`px-5 py-1`} text={"Edit"} />
                                </Link>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface IBalanceCard {
    label: string;
    value: number;
    icon?: string;
    background: "red" | "blue" | "green";
}

const BalanceCard: FunctionComponent<IBalanceCard> = ({ label, value, icon = "", background }) => {
    // vars
    let bg = "red";
    switch (background) {
        case "red":
            bg = "bg-[#FE5164]";
            break;
        case "green":
            bg = "bg-[#82A608]";
            break;
        case "blue":
            bg = "bg-[#542BE7]";
            break;

        default:
            break;
    }

    return (
        <Card background={bg} className={`w-full flex items-center pl-3 xl:pl-4 text-white !rounded-xl h-20`}>
            <div className={`flex space-x-2 w-full`}>
                <div className={`w-7 h-7 rounded-sm`}>
                    <img src={icon} />
                </div>
                <div className={`space-y-0.5`}>
                    <div className={`capitalize text-sm`}>{label}</div>
                    <div className={`font-bold text-xl`}>₦{value}</div>
                </div>
            </div>
        </Card>
    );
};
