import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { RequestUser } from "../middleware/auth";
import { setTokenCookie } from "./cookies";

class AccessTokens {
    public static create(user: RequestUser, expiresIn?: string, req?: Request, res?: Response) {
        expiresIn = expiresIn ?? "30d";
        const token = jwt.sign(user, process.env.JWT_SECRET!, { expiresIn });

        if (req && res) setTokenCookie(token, req, res);

        return token;
    }
}

export default AccessTokens;
