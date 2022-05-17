import { Router } from "express";
import SchemaValidator from "../helpers/joi";
import { _Responder } from "../controllers";

export const RESPONDER_ROUTER = Router();

const r = RESPONDER_ROUTER;
const R = _Responder;
