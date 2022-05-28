import { FunctionComponent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { number } from "yup";
import { Modal, PrimaryButton } from "../../components/base";
import { PdfDocument } from "../../components/base/FileViewer";
import { CommonCloudinaryWidget } from "../../components/cloudinary";
import { SettingsPageAccordion } from "../../components/domains";
import { useResponder } from "../../context";
import { ResponderAccountService } from "../../services";
import { IResponder } from "../../types/service-types";
import { UploadedFile } from "../../types/service-types/files";

type Document = {
    file: UploadedFile;
    title: string;
    allowChange?: boolean;
};

export const DocumentsSettingsPage: FunctionComponent = () => {
    // vars
    const responderContext = useResponder();

    // state
    const [documents, setDocuments] = useState<Array<Document>>([]);
    const [idDocument, setIdDocument] = useState<UploadedFile | null>(null);
    const [showMultiUploadWidget, setShowMultiUploadWidget] = useState(true);
    const [user, setUser] = useState<IResponder>();
    const [fileDeleteData, setFileDeleteData] = useState({
        index: 0,
        showModal: false,
    });

    // utils
    const retrieveDocuments = () => {
        const responder: IResponder | undefined = responderContext?.currentResponder?.user;
        setUser(responder);
        if (!responder) return;

        const docs: Array<Document | undefined> = [
            responder.idDocument ? { title: "ID", file: responder.idDocument, allowChange: false } : undefined,
            responder.driversLicence ? { title: "Drivers' Licence", file: responder.driversLicence, allowChange: false } : undefined,
            ...responder.otherDocuments.map((doc) => ({ file: doc, title: "", allowChange: true })),
        ].filter((doc) => doc !== undefined);
        setDocuments(docs as Array<Document>);
        if (responder.idDocument) setIdDocument(responder.idDocument);
    };
    const handleMultiUpdate = async (res: any) => {
        if (res.event !== "success") return toast.error("An error occurred and your document could not be uploaded. Please, try again.");

        const url = res.info.secure_url;
        const type = res.info.format === "pdf" ? "pdf" : "image";

        const updatedDocuments = [...user!.otherDocuments, { url, type }];

        await ResponderAccountService.update({ otherDocuments: updatedDocuments }).then(([code, data]) => {
            if (code !== 0) return toast.error("An error occurred and your document could not be uploaded. Please, try again.");
            responderContext!.updateContext((draft) => {
                draft!.currentResponder!.user.otherDocuments = updatedDocuments;
            });
        });
    };
    const handleDeleteFile = async () => {
        const docs = user!.otherDocuments.filter((_, i) => i !== fileDeleteData.index);
        await ResponderAccountService.update({ otherDocuments: docs }).then(([code, data]) => {
            if (code !== 0) return toast.error("An error occurred and your document was not deleted. Please, try again.");
            responderContext!.updateContext((draft) => {
                draft!.currentResponder!.user.otherDocuments = docs;
            });
            setFileDeleteData({ ...fileDeleteData, showModal: false });
        });
    };

    // hooks
    useEffect(() => {
        retrieveDocuments();
    }, [JSON.stringify(responderContext?.currentResponder?.user)]);

    return (
        <SettingsPageAccordion label={"Documents & Certification"}>
            <div className={`w-full lg:w-10/12`}>
                {!idDocument && (
                    <div className={`space-y-2 pl-3`}>
                        <div className={`text-purple-800`}>Upload a valid means of identification. Document must be issued by the government or a reputable public agency.</div>
                        <PrimaryButton
                            className={`w-32 bg-green-600 hover:bg-green-500 flex justify-center items-center py-1 rounded-sm border-none outline-0 transition duration-700`}
                            type={"button"}
                            text={"Upload ID"}
                        />
                    </div>
                )}
                <div className={`my-5`}>
                    <Grid>
                        {documents.map((document, i) => (
                            <Document key={i} document={document} onButtonClick={() => setFileDeleteData({ ...fileDeleteData, index: i, showModal: true })} />
                        ))}
                    </Grid>
                </div>
                <div className={`mb-2 mt-12 lg:pl-3`}>
                    <div className={`text-purple-800`}>Upload supporting documents and certifications (PDF, JPEG and PNG formats only)</div>
                </div>
                <div className={`lg:pl-3`}>
                    <CommonCloudinaryWidget onSuccess={handleMultiUpdate} onFailure={() => null} multipleUploads />
                </div>
            </div>
            <Modal width="340px" isOpen={fileDeleteData.showModal} onClose={() => setFileDeleteData({ ...fileDeleteData, showModal: false })}>
                <div className={`space-y-3`}>
                    <div className={`text-sm font-semibold`}>Are you sure you want to delete this file?</div>
                    <div className={`flex gap-x-3`}>
                        <PrimaryButton onClick={handleDeleteFile} text={"Confirm"} className={`px-4`} />
                        <PrimaryButton onClick={() => setFileDeleteData({ ...fileDeleteData, showModal: false })} text={"Cancel"} className={`bg-red-500 px-4 border-none outline-none`} />
                    </div>
                </div>
            </Modal>
        </SettingsPageAccordion>
    );
};

const UploadButton: FunctionComponent<{ onClick: VoidFunction; text?: string }> = ({ onClick, text = "Upload" }) => {
    return <PrimaryButton className={`w-24 h-8 flex justify-center items-center`} text={text} type={"button"} onClick={onClick} />;
};

interface IDocumentComponent {
    document: Document;
    onButtonClick: VoidFunction;
}

const Document: FunctionComponent<IDocumentComponent> = ({ document, onButtonClick }) => {
    // vars
    const { title, file, allowChange = false } = document;

    return (
        <div className={`flex flex-col items-center space-y-2`}>
            <div>{title}</div>
            <div className={`w-full h-36 flex justify-center items-center`}>
                <div className={`h-full flex justify-center items-center`}>
                    {file.type == "image" ? (
                        <img className={`w-[90%] h-[90%] object-contain`} src={file.url} alt={title} />
                    ) : (
                        <div className={`relative w-28 -left-8 -pl-[40px] scale-[15%] border`}>
                            <PdfDocument url={file.url} showControls />
                        </div>
                    )}
                </div>
            </div>
            {allowChange && (
                <div>
                    <UploadButton text={"Delete"} onClick={onButtonClick} />
                </div>
            )}
        </div>
    );
};

const Grid: FunctionComponent<{ children?: any }> = ({ children }) => {
    return <div className={`grid grid-cols-2 lg:grid-cols-4 h-40`}>{children}</div>;
};
