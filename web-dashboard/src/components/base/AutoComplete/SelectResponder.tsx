import { FunctionComponent, useEffect, useState } from "react";
import { AdminRespondersService } from "../../../services";
import { IResponder } from "../../../types/service-types";
import { AutoCompleteDropdown, IAutoCompleteDropdown } from "./AutoCompleteDropdown";

export const SelectResponder: FunctionComponent<Omit<IAutoCompleteDropdown, "options">> = (props) => {
    // state
    const [responders, setResponders] = useState<Array<IResponder>>([]);

    // utils
    const fetchResponders = async () => {
        AdminRespondersService.fetchAll()
            .then(([code, data]) => {
                if (code !== 0) return;
                setResponders(data);
            })
            .catch((err) => null);
    };

    // hooks
    useEffect(() => {
        fetchResponders();
    }, []);

    return (
        <div>
            <AutoCompleteDropdown
                options={responders.map((responder) => ({
                    label: `${responder.firstName} ${responder.lastName}`,
                    value: responder._id,
                    key: responder._id,
                }))}
                {...props}
            />
        </div>
    );
};
