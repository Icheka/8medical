import { createWriteStream, readFileSync, WriteStream } from "fs";
import Handlebars from "handlebars";
import pdf from "html-pdf";

export interface IHTMLToPDFConstructor {
    html: {
        rawHTML?: string;
        templateFilePath?: string;
        payload?: Record<string, any>;
    };
}
export interface IHTMLToPDFExportMethod {
    outputFilePath?: string;
    options?: pdf.CreateOptions;
    writeStream?: WriteStream;
}

export class HTMLToPDF {
    html: string;

    constructor({ html }: IHTMLToPDFConstructor) {
        if (html.rawHTML) {
            this.html = html.rawHTML;
        } else if (html.templateFilePath && html.payload) {
            const source = readFileSync(html.templateFilePath, "utf-8");
            this.html = Handlebars.compile(source)(html.payload);
        } else {
            throw "`rawHTML` or `templateFilePath` and `payload` is required!";
        }
    }

    public exportToStream({ options, outputFilePath, writeStream }: IHTMLToPDFExportMethod) {
        if (!outputFilePath) throw "`outputFilePath` is required!";
        options = options ?? {
            format: "A4",
            orientation: "portrait",
        };

        pdf.create(this.html, options).toStream((err, stream) => {
            stream.pipe(writeStream ?? createWriteStream(outputFilePath));
            if (err) console.log("HTMLToPDF::exportToStream error ->", err);
        });
    }
}
