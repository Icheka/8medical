import { FunctionComponent } from "react";
import { Card, PrimaryButton } from "../components/base";
import { LineGraph } from "../components/charts";
import { AiOutlineDownload } from "react-icons/ai";

export const DashboardOverview: FunctionComponent = () => {
    return (
        <div>
            <div className={`flex items-center justify-between`}>
                <h1 className={`text-[#4F03A4] font-bold text-2xl`}>Dashboard Overview</h1>
                <div>
                    <PrimaryButton leftIcon={<AiOutlineDownload color={"white"} />} text={"Download report"} className={`px-4 py-2`} />
                </div>
            </div>
            <div className={`flex flex-col sm:flex-row justify-between items-start w-full gap-y-4 sm:gap-y-0 sm:gap-x-4 h-full mt-8`}>
                <div className={`flex flex-col justify-between items-start w-full sm:w-7/12 space-y-4`}>
                    <div className={`flex flex-col sm:flex-row justify-between items-start w-full gap-y-4 sm:gap-y-0 sm:gap-x-4 h-[128px] sm:h-[70px]`}>
                        {[
                            { label: "Total Balance", value: 2000000 },
                            { label: "Total Earned", value: 2000000 },
                            { label: "Total Withdrawn", value: 2000000 },
                        ].map((r, i) => (
                            <BalanceCard {...r} key={i} />
                        ))}
                    </div>
                    <div className={`h-[570px] w-full`}>
                        <Card className={`flex w-full h-full items-center !p-0`}>
                            <div className={`w-11/12 -ml-5 h-full`}>
                                <LineGraph tooltip />
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
                    <Card className={`w-full !h-[418.74px]`}></Card>
                </div>
            </div>
        </div>
    );
};

interface IBalanceCard {
    label: string;
    value: number;
}

const BalanceCard: FunctionComponent<IBalanceCard> = ({ label, value }) => {
    return (
        <Card className={`w-full flex justify-center items-center pt-2`}>
            <div className={`flex space-x-2`}>
                <div className={`bg-[#100DB1] w-9 h-9 rounded-sm`}></div>
                <div>
                    <div className={`capitalize text-xs`}>{label}</div>
                    <div className={`font-bold text-lg`}>₦{value}</div>
                </div>
            </div>
        </Card>
    );
};
