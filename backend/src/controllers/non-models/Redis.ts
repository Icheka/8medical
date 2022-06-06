import IORedis from "ioredis";

import { KEYS as keys } from "../../keys";

const KEYS = keys();
/**
 * An abstraction layer for interacting with an underlying Redis DB
 * Using this will give us the freedom to migrate to a different client comparatively quickly and easily
 */
export class RedisClient {
    url: string;
    client: IORedis;

    constructor(url?: string) {
        url = url ?? KEYS.REDIS.url;
        this.url = url;

        try {
            if (KEYS.REDIS.url) this.client = new IORedis(KEYS.REDIS.url);
            else
                this.client = new IORedis({
                    host: KEYS.REDIS.host,
                    port: Number(KEYS.REDIS.port ?? 0),
                    maxRetriesPerRequest: 5,
                });
            console.log(">>>>>>>>> ", KEYS.REDIS.url);
        } catch (err) {
            console.log("Redis connection error >>", err);
            this.client = new IORedis();
        }
    }

    async set(key: string, value: any) {
        try {
            this.client.set(key, JSON.stringify(value));
            return true;
        } catch (e) {
            return false;
        }
    }

    async get(key: string) {
        try {
            return this.client.get(key).then((value) => JSON.parse(value ?? JSON.stringify(null)));
        } catch (e) {
            return null;
        }
    }
}
