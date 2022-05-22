import { Router } from "express";
import AuthMiddleware from "../../middleware/auth";
import { ACCOUNT_ROUTER } from "./account";
import { EVENTS_ROUTER } from "./events";
import { MISSION_ROUTER } from "./missions";

export const RESPONDER_ROUTER = Router();
const ResponderAuth = AuthMiddleware.responderAuth;

RESPONDER_ROUTER.use("/account", ACCOUNT_ROUTER);
RESPONDER_ROUTER.use("/events", ResponderAuth, EVENTS_ROUTER);
RESPONDER_ROUTER.use("/missions", ResponderAuth, MISSION_ROUTER);
