import { FunctionComponent, useEffect, useState } from "react";
import { FaCheck, FaStar } from "react-icons/fa";
import { useResponder } from "../../context";
import { IResponder } from "../../types/service-types";

interface IVerifiedBadge {
    onClick?: VoidFunction;
    className?: string;
}

export const VerifiedBadge: FunctionComponent<IVerifiedBadge> = ({ onClick, className }) => {
    // state
    const responderContext = useResponder();
    const [user, setUser] = useState<IResponder>();

    // hooks
    useEffect(() => {
        if (!responderContext?.currentResponder?.user) return;
        setUser(responderContext!.currentResponder!.user);
    }, [JSON.stringify(responderContext?.currentResponder?.user)]);

    return (
        <>
            <button
                className={`flex justify-center items-center space-x-1 px-4 py-0.5 rounded-xl ${user?.accountVerified ? "text-green-600 bg-green-200" : "text-red-600 bg-red-200"} ${className}`}
                onClick={() => !user?.accountVerified && onClick && onClick()}
            >
                <span>{user?.accountVerified ? "Verified" : "Unverified"}</span>
                {user?.accountVerified ? <FaCheck className={`text-md`} /> : <FaStar className={`text-md`} />}
            </button>
        </>
    );
};
