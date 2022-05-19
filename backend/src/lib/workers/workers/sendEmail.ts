import { EmailLib, MailPayloadType } from "../../email";
import { BackgroundWorker } from "../worker.class";

export const sendEmailWorker = new BackgroundWorker("send-email");

export interface ISendMailWorkerConstructor {
    address: string;
    subject: string;
    payload: Record<string, any>;
    template: string;
    onSuccess?: () => null;
    onFail?: () => null;
}

export class SendMailWorker {
    emailLibProps: MailPayloadType;
    onSuccess?: () => null;
    onFail?: () => null;

    constructor({ address, subject, payload, template, onFail, onSuccess }: ISendMailWorkerConstructor) {
        this.emailLibProps = {
            address,
            subject,
            payload,
            template,
        };
        this.onFail = onFail;
        this.onSuccess = onSuccess;

        sendEmailWorker.addToQueue("send-email", {}, async (job) => this.sendMail());
    }

    private async sendMail() {
        await EmailLib.sendEmail(this.emailLibProps);
    }
}
