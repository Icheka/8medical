class Logger {
    public static log(...args: Array<any>) {
        const env = process.env.NODE_ENV;
        switch (env) {
            case "production":
                return;
            case "development":
            case "test":
                console.log(...args);
                return;

            default:
                break;
        }
    }
}

export default Logger;
