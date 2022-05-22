import { Router } from "express";
import { _Mission } from "../../controllers";

export const MISSION_ROUTER = Router();

const r = MISSION_ROUTER;
const M = _Mission;

// @route POST /api/admin/missions
// @desc Create mission
// @access Admin
r.post("/", async (req, res) => {
    const d = await _Mission.createMission(req.body);

    if (d.error) return res.send(d.data).status(406);
    return res.send(d.data);
});

// @route GET /api/admin/missions
// @desc Fetch all missions
// @access Admin
r.get("/", async (req, res) => {
    const d = await _Mission.FetchAll();
    return res.send(d).status(d.error ? 406 : 200);
});

// @route GET /api/admin/missions/:id
// @desc Fetch mission by ID
// @access Admin, Responder
r.get("/:id", async (req, res) => {
    const d = await _Mission.FetchOne(req.params.id);
    return res.send(d).status(d.error ? 406 : 200);
});

// @route DELETE /api/admin/missions
// @desc Delete all missions
// @access Admin
r.delete("/", async (req, res) => {
    const d = await _Mission.DeleteAll();
    return res.send(d.data).status(d.error ? 406 : 200);
});

// @route DELETE /api/admin/missions/:id
// @desc Delete mission by ID
// @access Admin
r.delete("/:id", async (req, res) => {
    const d = await _Mission.DeleteOne(req.params.id);
    return res.send(d).status(d.error ? 406 : 200);
});

// @route PATCH /api/admin/missions/:id
// @desc Update mission by ID
// @access Admin
r.patch("/:id", async (req, res) => {
    const d = await _Mission.UpdateOne(req.params.id, req.body);
    return res.send(d).status(d.error ? 406 : 200);
});
