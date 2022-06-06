import { Router } from "express";
import AuthMiddleware from "../../middleware/auth";

import { ACCOUNT_ROUTER } from "./account";
import { ENROLLEE_ROUTER } from "./enrollee";
import { INSTITUTION_ROUTER } from "./institution";
import { MISSION_ROUTER } from "./mission";
import { RESPONDERS_ROUTER } from "./responder";
import { SITE_ROUTER } from "./site";
import { VEHICLE_ROUTER } from "./vehicle";

export const ADMIN_ROUTER = Router();
const AdminAuth = AuthMiddleware.adminAuth;

ADMIN_ROUTER.use("/account", ACCOUNT_ROUTER);
ADMIN_ROUTER.use("/enrollees", AdminAuth, ENROLLEE_ROUTER);
ADMIN_ROUTER.use("/institutions", AdminAuth, INSTITUTION_ROUTER);
ADMIN_ROUTER.use("/missions", AdminAuth, MISSION_ROUTER);
ADMIN_ROUTER.use("/responders", AdminAuth, RESPONDERS_ROUTER);
ADMIN_ROUTER.use("/site", AdminAuth, SITE_ROUTER);
ADMIN_ROUTER.use("/vehicles", AdminAuth, VEHICLE_ROUTER);
