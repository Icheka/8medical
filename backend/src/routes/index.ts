import { Router } from "express";
import { RESPONDER_ROUTER } from "./responder";

export const API_ROUTER = Router();

API_ROUTER.use("/responder", RESPONDER_ROUTER);
