import { FunctionComponent, ReactNode, useEffect, useMemo, useState } from "react";
import { Tab } from "@headlessui/react";
import { Page } from "../../components/layout";
import { EInstitutionType, IInstitution } from "../../types/service-types";
import { AdminInstitutionsService } from "../../services/admin/institutions";
import { PaginatedTable, PrimaryButton } from "../../components/base";
import { routes } from "../../config";
import { Link } from "react-router-dom";

export const InstitutionsPage: FunctionComponent = () => {
    // vars
    const headers = ["Name", "Email", "Phone", "Address"];
    const tabs = ["Hospitals", "Imaging", "Laboratories"];

    // state
    const [rows, setRows] = useState<Array<Array<string | ReactNode>>>([]);
    const [institutions, setInstitutions] = useState<Array<IInstitution>>([]);
    const [isLoading, setIsLoading] = useState(true);

    // utils
    const useFilter = (type: EInstitutionType) =>
        useMemo(() => {
            return prepareRows(institutions.filter((institution) => institution.type === type));
        }, [rows.length]);
    const fetchInstitutions = async () => {
        AdminInstitutionsService.fetchAll()
            .then(([code, data]) => {
                if (code !== 0) return;
                setInstitutions(data);
                setRows(prepareRows(data));
            })
            .catch((err) => null)
            .finally(() => setIsLoading(false));
    };
    const prepareRows = (data: Array<IInstitution>) => data.map(({ name, address, email, phone }) => [name, email, phone, address]);

    // hooks
    useEffect(() => {
        fetchInstitutions();
    }, []);

    return (
        <Page loading={isLoading}>
            <Tab.Group>
                <Tab.List>
                    {tabs.map((tab, i) => (
                        <Tab key={i} className={({ selected }: { selected: boolean }) => `${selected ? "bg-purple-500 text-white" : "bg-gray-50 border-gray-200 text-black"} px-4 py-1`}>
                            {tab}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        <PaginatedTable
                            headers={headers.map((h, i) => (
                                <div key={i} className={`uppercase text-xs text-[#4B5057]`}>
                                    {h}
                                </div>
                            ))}
                            rows={useFilter(EInstitutionType.hospital)}
                            showControls
                        />
                    </Tab.Panel>
                    <Tab.Panel>
                        <PaginatedTable
                            headers={headers.map((h, i) => (
                                <div key={i} className={`uppercase text-xs text-[#4B5057]`}>
                                    {h}
                                </div>
                            ))}
                            rows={useFilter(EInstitutionType.imaging)}
                            showControls
                        />
                    </Tab.Panel>
                    <Tab.Panel>
                        <PaginatedTable
                            headers={headers.map((h, i) => (
                                <div key={i} className={`uppercase text-xs text-[#4B5057]`}>
                                    {h}
                                </div>
                            ))}
                            rows={useFilter(EInstitutionType.laboratory)}
                            showControls
                        />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
            <div className={`mt-5`}>
                <Link to={routes.admin.institutions + "/add"}>
                    <PrimaryButton className={`px-5 py-1`} text={"Add Institution"} />
                </Link>
            </div>
        </Page>
    );
};
