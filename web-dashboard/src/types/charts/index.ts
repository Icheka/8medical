import { CurveType } from "recharts/types/shape/Curve";

export interface ILine {
    type?: CurveType;
    dataKey: string;
    stroke: string;
    fill: string;
}
