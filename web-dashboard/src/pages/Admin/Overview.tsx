import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../assets/images";
import { Card } from "../../components/base";
import { EnrolleesTable, RespondersTable } from "../../components/domains";
import { DashboardHeader } from "../../components/layout";
import { routes } from "../../config";

export const AdminDashboardOverview: FunctionComponent = () => {
    // vars
    const navigate = useNavigate();

    return (
        <div>
            <div className={`flex flex-col w-full gap-y-10 h-full`}>
                <div className={`flex flex-col justify-between items-start w-full space-y-4`}>
                    <div className={`capitalize font-medium`}>Site statistics</div>
                    <div className={`hidden lg:flex flex-col sm:flex-row justify-between items-start w-full gap-y-4 sm:gap-y-0 sm:gap-x-4 h-[128px] sm:h-[70px]`}>
                        <BalanceCard label="users and enrollees" value={0} icon={IMAGES.AccountBalance} background={"blue"} />
                        <BalanceCard label="responders" value={0} icon={IMAGES.MoneyWithdrawn} background={"blue"} />
                        <BalanceCard label="institutions" value={0} icon={IMAGES.MoneyEarned} background={"blue"} />
                        <BalanceCard label="Revenue/earnings" value={0} icon={IMAGES.MoneyEarned} background={"blue"} />
                    </div>
                    <div className={`capitalize font-medium pt-3`}>ride statistics</div>
                    <div className={`hidden lg:flex flex-col sm:flex-row justify-between items-start w-full gap-y-4 sm:gap-y-0 sm:gap-x-4 h-[128px] sm:h-[70px]`}>
                        <BalanceCard label="Calls" value={0} icon={IMAGES.AccountBalance} background={"green"} />
                        <BalanceCard label="Active responses" value={0} icon={IMAGES.MoneyWithdrawn} background={"green"} />
                        <BalanceCard label="dispatched calls" value={0} icon={IMAGES.MoneyEarned} background={"green"} />
                        <BalanceCard label="cancelled calls" value={0} icon={IMAGES.MoneyEarned} background={"green"} />
                    </div>
                </div>
                <div>
                    <DashboardHeader hideActionButtons title={"Enrollees"} />
                    <EnrolleesTable hideAddEnrolleeButton limitRows={5} />
                </div>
                <div>
                    <DashboardHeader hideActionButtons title={"Responders"} />
                    <RespondersTable limitRows={5} />
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
        <Card background={bg} className={`w-full px-1 pt-3 text-white`}>
            <div className={`flex space-x-2 w-full pl-1`}>
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
