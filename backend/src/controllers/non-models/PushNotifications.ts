import { Expo, ExpoPushMessage, ExpoPushTicket } from "expo-server-sdk";

// deferring providing an access token for v1
const expo = new Expo();

export class ExpoPushNotifications {
    pushTokens: Array<string> = [];
    messages: Array<ExpoPushMessage> = [];
    receiptIds: Array<string> = [];

    public addPushToken(token: string) {
        if (Expo.isExpoPushToken(token)) this.pushTokens.push(token);
    }

    public addPushTokens(tokens: Array<string>) {
        for (const token of tokens) {
            if (Expo.isExpoPushToken(token)) this.pushTokens.push(token);
        }
    }

    public addMessageToBatch(message: ExpoPushMessage) {
        message.sound = message.sound ?? "default";
        this.messages.push(message);
    }

    /**
     *
     * @returns an array of receipt IDs
     */
    public async sendBatch(): Promise<Array<string>> {
        let chunks;
        let recursive = false;

        // for reliability, only send chunks of less than 100 messages
        if (this.messages.length >= 100) {
            chunks = expo.chunkPushNotifications(this.messages.slice(0, 99));
            // since we need to send >100 messages,
            // we'll need to recursivey call sendBatch to send all
            // messages
            recursive = true;
            this.messages = this.messages.slice(100);
        } else {
            chunks = expo.chunkPushNotifications(this.messages);
        }

        // receipt tickets
        const tickets: Array<ExpoPushTicket> = [];
        (async () => {
            for (const chunk of chunks) {
                try {
                    const ticket = await expo.sendPushNotificationsAsync(chunk);
                    ticket.push(...ticket);
                } catch (error) {
                    console.log(error);
                }
            }
        })();

        // IDs of successfully sent messages
        this.receiptIds = [];
        for (const ticket of tickets) {
            if ((ticket as any).id) this.receiptIds.push((ticket as any).id);
        }

        if (recursive) {
            return this.sendBatch();
        }
        return this.receiptIds;
    }
}
