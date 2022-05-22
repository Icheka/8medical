import { Router } from "express";

import { ADMIN_ROUTER } from "./admin";
import { RESPONDER_ROUTER } from "./responder";

export const API_ROUTER = Router();

API_ROUTER.use("/admin", ADMIN_ROUTER);
API_ROUTER.use("/responder", RESPONDER_ROUTER);
