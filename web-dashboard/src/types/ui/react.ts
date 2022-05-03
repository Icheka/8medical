import { FunctionComponent, ReactNode } from "react";

export interface IComponent {
    className?: string | Array<string>;
    children?: ReactNode;
    style?: Record<string, string | number>;
}
