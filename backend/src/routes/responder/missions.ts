import { Router } from "express";
import { MissionModel } from "../../models";
import { _Mission } from "../../controllers";

export const MISSION_ROUTER = Router();

const r = MISSION_ROUTER;

// @route GET /api/responder/missions
// @desc Fetch all missions
// @access Responder
r.get("/", async (req, res) => {
    const id = req.context.user!._id;

    const d = await _Mission.missionsForResponder(id);

    return res.send({ data: d });
});

// @route GET /api/responder/missions/:id
// @desc Fetch mission by ID
// @access Responder
r.get("/:id", async (req, res) => {
    const d = await _Mission.FetchOne(req.params.id);
    return res.send(d).status(d.error ? 406 : 200);
});
