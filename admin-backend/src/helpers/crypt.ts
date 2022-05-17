import bcrypt from "bcrypt";
import Log from "../lib/logger";

class Crypt {
    public static async hash(plainText: string, rounds?: number) {
        return await bcrypt
            .hash(plainText, rounds || 10)
            .then((value) => value)
            .catch((err) => {
                Log.log("Error hashing text! :>>", err);
                return null;
            });
    }

    public static async compare(plainText: string, hash: string) {
        return await bcrypt
            .compare(plainText, hash)
            .then((value) => value)
            .catch((err) => {
                Log.log("Error comparing hash! :>>", err);
                return null;
            });
    }
}

export default Crypt;
