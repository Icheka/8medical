import { FunctionComponent } from "react";
import { Card } from "../components/base";
import { LineGraph } from "../components/charts";

export const DashboardOverview: FunctionComponent = () => {
    return (
        <div>
            <div className={`flex flex-col sm:flex-row justify-between items-start w-full gap-y-4 sm:gap-y-0 sm:gap-x-4 h-full`}>
                <div className={`flex flex-col justify-between items-start w-full sm:w-7/12 space-y-4`}>
                    <div className={`flex flex-col sm:flex-row justify-between items-start w-full gap-y-4 sm:gap-y-0 sm:gap-x-4 h-[300px] sm:h-[140px]`}>
                        <Card className={`w-full px-4 py-5`} />
                        <Card className={`w-full px-4 py-5`} />
                        <Card className={`w-full px-4 py-5`} />
                    </div>
                    <div className={`h-[240px] w-full`}>
                        <Card className={`flex w-full h-full items-center !p-0`}>
                            <div className={`w-11/12 -ml-5 h-full`}>
                                <LineGraph tooltip />
                            </div>
                        </Card>
                    </div>
                    <div className={`h-[240px] hidden sm:flex justify-between items-center gap-x-4 w-full`}>
                        <Card />
                        <Card />
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
            <div className={`mt-4 h-[500px] hidden sm:flex justify-between items-center gap-x-4`}>
                <Card />
                <Card />
            </div>
        </div>
    );
};
