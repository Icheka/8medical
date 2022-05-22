import { Queue, Job, Worker, QueueEvents } from "bullmq";
import { redisClient } from "../../app";

type TQueuedJobHandler = (job: Job) => void;
type TCompletedJobHandler = ({}: { jobId: string; returnvalue: string; prev?: string | undefined }) => void;
type TFailedJobHandler = ({}: { jobId: string; failedReason: string; prev?: string | undefined }) => void;
const redisConnection = redisClient.client;

export class BackgroundWorker {
    name: string;
    queue: Queue;
    handlers: Record<string, TQueuedJobHandler> = {};
    queueEvents: QueueEvents;

    constructor(name: string) {
        this.name = name;
        this.queue = new Queue(name, {
            connection: redisConnection,
        });
        this.queueEvents = new QueueEvents(name, {
            connection: redisConnection,
        });
        return this;
    }

    addToQueue(name: string, data: Record<string, any>, handler: TQueuedJobHandler) {
        this.queue.add(name, data);
        this.handlers[name] = handler;
        return this;
    }

    processJobs() {
        const worker = new Worker(
            this.name,
            async (job) => {
                const lookup = this.handlers[job.name];
                if (!lookup) return;
                await lookup(job);
            },
            {
                connection: redisConnection,
            }
        );

        return this;
    }

    whenComplete(eventHandler: TCompletedJobHandler) {
        this.queueEvents.on("completed", (data) => eventHandler(data));
        return this;
    }

    whenFail(eventHandler: TFailedJobHandler) {
        this.queueEvents.on("failed", (data) => eventHandler(data));
        return this;
    }
}
