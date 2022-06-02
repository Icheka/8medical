import { FunctionComponent } from "react";
import ReactLoading from "react-loading";

interface IPage {
    children?: any;
    loading: boolean;
}

export const Page: FunctionComponent<IPage> = ({ children, loading }) => {
    return (
        <div className={`min-h-screen relative`}>
            {children}
            {loading && <Loader />}
        </div>
    );
};

const Loader: FunctionComponent = () => (
    <div className={`min-h-[80vh] bg-purple-50/70 w-full absolute inset-0 z-[100] flex justify-center `}>
        <ReactLoading type={"spin"} className={`fixed top-96`} color={"purple"} />
    </div>
);
