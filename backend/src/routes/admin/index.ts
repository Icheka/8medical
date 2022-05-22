import { Router } from "express";

import { MISSION_ROUTER } from "./mission";

export const ADMIN_ROUTER = Router();

ADMIN_ROUTER.use("/missions", MISSION_ROUTER);
