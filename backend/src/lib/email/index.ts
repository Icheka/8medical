import { readFileSync } from "fs";
import Handlebars from "handlebars";
import nodemailer from "nodemailer";
import path from "path";

type FromField = {
    host: string;
    port: string;
    auth: {
        user: string;
        pass: string;
    };
    email: string;
};

type MailPayloadType = {
    address: string;
    subject: string;
    payload: Record<string, any>;
    template: string;
    from?: Partial<FromField>;
};

export class EmailLib {
    // vars
    static defaultFromField: Partial<FromField> | undefined = {
        host: process.env.EMAIL_HOST!,
        port: process.env.EMAIL_PORT!,
        auth: {
            user: process.env.EMAIL_USERNAME!,
            pass: process.env.EMAIL_PASSWORD!,
        },
        email: process.env.FROM_EMAIL!,
    };

    public static async sendEmail(mail: MailPayloadType) {
        const defaultFromField: Partial<FromField> | undefined = {
            host: process.env.EMAIL_HOST!,
            port: process.env.EMAIL_PORT!,
            auth: {
                user: process.env.EMAIL_USERNAME!,
                pass: process.env.EMAIL_PASSWORD!,
            },
            email: process.env.FROM_EMAIL!,
        };

        mail.from = { ...mail.from, ...defaultFromField };
        const { host, port, auth, email: from } = mail.from;

        try {
            // type-casting this to `any` because, for some obscure reason,
            // the TS compiler doesn't think that createTransport has a `host` field
            const transporter = (nodemailer.createTransport as any)({
                host,
                port,
                auth,
                secure: port === "465",
            });

            const source = readFileSync(path.join(process.cwd(), "src", "email_templates", mail.template), "utf-8");
            const options = {
                from,
                to: mail.address,
                subject: mail.subject,
                html: Handlebars.compile(source)(mail.payload),
            };

            return transporter.sendMail(options);
        } catch (err) {
            return err;
        }
    }
}
