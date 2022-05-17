import Log from "../lib/logger";

class _Error {
    guard() {
        return process.on("unhandledRejection", (err, promise) => {
            // this.log("#", `_Handler:>> Unhandled Promise Rejection[Promise: ${promise.toString()}|Error: '${err}]'`, 5);
            Log.log("An unhandled exception occurred! :>>", err);
        });
    }
}

export default new _Error();
