declare module "express";

import path from "path";
import dotenv from "dotenv";
import _error from "./helpers/_error";

// application setup
const ENV_FILE = process.argv.length > 2 ? process.argv[2] : undefined;
_error.guard();
ENV_FILE && dotenv.config({ path: path.join(process.cwd(), ENV_FILE) });

import { keys, KEYS } from "./keys";

import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import requestIP from "request-ip";
import Log from "./lib/logger";
import dbConnect from "./helpers/dbConnect";

import { RequestUser } from "./middleware/auth";

import { RedisClient } from "./controllers/non-models/Redis";
export const redisClient = new RedisClient();

const app = express();
dbConnect.connect();

// middleware
app.use(
    cors({
        origin: (origin, callback) => callback(null, true),
        // origin: process.env.CLIENT_URL,
        credentials: true,
    })
);
app.use(requestIP.mw());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/assets", express.static(path.join(__dirname, "assets")));

// extend express Request
import { Express } from "express-serve-static-core";

type RequestContext = {
    user?: RequestUser;
};

declare module "express-serve-static-core" {
    interface Request {
        context: RequestContext;
    }
}

// convert all email fields in requests to lowercase
app.use("/", (req, res, next) => {
    if (req.body.email && typeof req.body.email === "string") req.body.email = req.body.email.toLowerCase();

    next();
});

// startup/exit
const port = process.env.PORT;
if (!port) throw `Application PORT must be defined!`;

// register Handlebars helpers
import { registerHandlebarsHelpers } from "./utils";
registerHandlebarsHelpers();

// const server = app.listen(port, () => {
//     Admins.createIfNotExists();
// });
const server = app.listen(port, () => {
    Log.log(`Listening at port ${port}`);
});

import { Server as IOServer } from "socket.io";
export const io = new IOServer(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log("A client opened an IO connection");
    io.emit("connection", null);
});

import { API_ROUTER } from "./routes";

// routes
// APIS
app.use(`/api`, API_ROUTER);

if (KEYS().ENVIRONMENT.stage === "development") {
    redisClient.set("test", "test");
    (async () => {
        if ((await redisClient.get("test")) === "test") console.log(">>>>>>>>>>>>>>\n\n", "Redis is up!", "\n\n>>>>>>>>>>>>>");
    })();
}

export default server;
