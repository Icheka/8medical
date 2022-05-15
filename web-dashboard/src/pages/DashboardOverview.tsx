import { FunctionComponent } from "react";
import { IMAGES } from "../assets/images";
import { Card, UnderlinedButton } from "../components/base";
import { EarningsLiteTable, RidesTable } from "../components/domains";
import { DashboardHeader } from "../components/layout";

export const DashboardOverview: FunctionComponent = () => {
    // state

    return (
        <div>
            <DashboardHeader title={"Dashboard Overview"} />
            <div className={`flex flex-col sm:flex-row justify-between items-start w-full gap-y-4 sm:gap-y-0 sm:gap-x-4 h-full mt-8`}>
                <div className={`flex flex-col justify-between items-start w-full sm:w-7/12 space-y-4`}>
                    <div className={`flex flex-col sm:flex-row justify-between items-start w-full gap-y-4 sm:gap-y-0 sm:gap-x-4 h-[128px] sm:h-[70px]`}>
                        <BalanceCard label="Balance" value={200000} icon={IMAGES.AccountBalance} background={"blue"} />
                        <BalanceCard label="Total Earned" value={200000} icon={IMAGES.MoneyWithdrawn} background={"green"} />
                        <BalanceCard label="Total Withdrawn" value={200000} icon={IMAGES.MoneyEarned} background={"red"} />
                    </div>
                    <div className={`h-[570px] w-full`}>
                        <Card className={`w-full h-full !p-0`}>
                            <div className={`py-4`}>
                                <div className={`flex px-4 pb-4 justify-between items-center border-b border-[#e2e8ef]`}>
                                    <span className={`font-bold text-[#4F03A4] text-2xl`}>Rides</span>
                                    <UnderlinedButton text={"View all"} />
                                </div>
                                <div className={`px-4 pt-8`}>
                                    <RidesTable />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
                <div className={`w-full sm:w-5/12 space-y-4`}>
                    <Card
                        className={`w-full !h-[218.74px]`}
                        style={{
                            background: `linear-gradient(0deg, #6D09F9 2.47%, #4300A2 58.86%)`,
                        }}
                    ></Card>
                    <Card className={`w-full !h-[420px] !p-0 flex flex-col justify-start`}>
                        <EarningsLiteTable />
                    </Card>
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
        <Card background={bg} className={`w-full flex justify-center items-center pt-2 text-white`}>
            <div className={`flex space-x-2`}>
                <div className={`w-7 h-7 rounded-sm`}>
                    <img src={icon} />
                </div>
                <div>
                    <div className={`capitalize text-xs`}>{label}</div>
                    <div className={`font-bold text-lg`}>₦{value}</div>
                </div>
            </div>
        </Card>
    );
};
