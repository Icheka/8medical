import { FunctionComponent } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar } from "recharts";
import { ILine } from "../../../types/charts";
import { IComponent } from "../../../types/ui";

export interface ILineGraph extends IComponent {
    lines?: Array<ILine>;
    legend?: boolean;
    tooltip?: boolean;
    xAxisKey?: string;
    data?: any;
}

// fallback until functional APIs are added
const data01 = [
    { name: "A", x: 12, y: 23, z: 122 },
    { name: "B", x: 22, y: 3, z: 73 },
    { name: "C", x: 13, y: 15, z: 32 },
    { name: "D", x: 44, y: 35, z: 23 },
    { name: "E", x: 35, y: 45, z: 20 },
    { name: "F", x: 62, y: 25, z: 29 },
    { name: "G", x: 37, y: 17, z: 61 },
    { name: "H", x: 28, y: 32, z: 45 },
    { name: "I", x: 19, y: 43, z: 93 },
];

export const LineGraph: FunctionComponent<ILineGraph> = ({ lines = [{ dataKey: "x", fill: "#E2ABA3", stroke: "#888d48", type: "monotone" }], legend, tooltip, xAxisKey = "name", data = data01 }) => {
    return (
        <ResponsiveContainer className={`m-0 p-0`}>
            <LineChart
                // data={data}
                data={data}
            >
                <CartesianGrid strokeDasharray={`3 3`} stroke={"#ccc"} />
                <XAxis dataKey={xAxisKey} />
                <YAxis />
                {tooltip && <Tooltip />}
                {legend && <Legend />}
                {lines.map((line, i) => (
                    <Line {...line} key={i} />
                ))}
                <Bar dataKey={"y"} fill={"#333"} />
            </LineChart>
        </ResponsiveContainer>
    );
};
