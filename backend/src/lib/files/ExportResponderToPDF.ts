import { mkdirSync } from "fs";
import { keys } from "../../keys";
import path from "path";
import { _Mission, _Responder } from "../../controllers";
import { HydratedDocumentType } from "../../models";
import { IResponder } from "../../types";
import { HTMLToPDF } from "./HTMLToPDF";

export class ExportResponderToPDF {
    responder: HydratedDocumentType<IResponder> | null;

    constructor() {
        this.responder = null;
    }

    public async setResponder(id: string) {
        await _Responder
            .FetchOne(id)
            .then((data) => {
                if (data.error) return;

                this.responder = data.data! as HydratedDocumentType<IResponder>;
            })
            .catch(console.log);
        return this;
    }

    public async export() {
        if (!this.responder) return null;

        const rootDir = path.join(process.cwd(), "src", "tmp", "exports");
        const outputRootDir = path.join(process.cwd(), "src", "assets", "exports");
        mkdirSync(rootDir, { recursive: true });
        mkdirSync(outputRootDir, { recursive: true });

        const r = this.responder.toObject();
        const missions = await _Mission.missionsForResponder(r._id.toString());

        const pdf = new HTMLToPDF({
            html: {
                templateFilePath: path.join(process.cwd(), "src", "html_templates", "export_responder_pdf.hbs"),
                payload: {
                    profile: [
                        { key: "Name", value: `${r.lastName}, ${r.firstName} ${r.middleName ? r.middleName : ""}` },
                        { key: "Gender", value: r.gender ?? "-" },
                        { key: "Email Address", value: r.email },
                        { key: "Phone Number", value: r.phone },
                        { key: "Account status", value: r.activityStatus },
                        {
                            key: "Date joined",
                            value: r.createdAt.toLocaleString("en-GB"),
                        },
                    ],
                    documentTitle: "8Medical work report",
                    missions: missions.map((mission) => mission.toObject()),
                },
            },
        });

        const fileName = `${r.firstName}_${r.lastName}-${r._id}`;
        pdf.exportToStream({ outputFilePath: path.join(outputRootDir, `${fileName}.pdf`) });
        return path.join("assets", "exports", `${fileName}.pdf`);
    }
}
