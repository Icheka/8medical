import { Router } from "express";

import { ACCOUNT_ROUTER } from "./account";
import { ENROLLEE_ROUTER } from "./enrollee";
import { INSTITUTION_ROUTER } from "./institution";
import { MISSION_ROUTER } from "./mission";
import { RESPONDERS_ROUTER } from "./responder";
import { VEHICLE_ROUTER } from "./vehicle";

export const ADMIN_ROUTER = Router();

ADMIN_ROUTER.use("/account", ACCOUNT_ROUTER);
ADMIN_ROUTER.use("/enrollees", ENROLLEE_ROUTER);
ADMIN_ROUTER.use("/institutions", INSTITUTION_ROUTER);
ADMIN_ROUTER.use("/missions", MISSION_ROUTER);
ADMIN_ROUTER.use("/responders", RESPONDERS_ROUTER);
ADMIN_ROUTER.use("/vehicles", VEHICLE_ROUTER);
