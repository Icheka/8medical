export const KEYS = () => ({
    APP_DOMAIN: process.env.APP_DOMAIN,
    PORT: process.env.PORT,
    WEBSITE_URL: process.env.CLIENT_URL,
    REDIS: {
        host: process.env.REDIS_HOST!,
        port: process.env.REDIS_PORT!,
        url: process.env.REDIS_URL!,
    },
    ENVIRONMENT: {
        stage: process.env.NODE_ENV as "production" | "development" | "stage",
    },
});

export const keys = KEYS();
