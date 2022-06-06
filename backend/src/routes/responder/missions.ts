import { Router } from "express";
import { HydratedDocumentType, MissionNoteModel } from "../../models";
import { IMission } from "../../types";
import { _Mission } from "../../controllers";

export const MISSION_ROUTER = Router();

const r = MISSION_ROUTER;

// @route GET /api/responder/missions
// @desc Fetch all missions
// @access Responder
r.get("/", async (req, res) => {
    const id = req.context.user!._id as string;

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

// @route POST /api/responder/missions/:id/note
// @desc Add note
// @access Responder
r.post("/:id/note", async (req, res) => {
    await _Mission.addNote(req.context.user!._id, req.params.id, req.body.text);
    return res.send();
});

// @route GET /api/responder/missions/:id/note
// @desc Fetch note
// @access Responder
r.get("/:id/note", async (req, res) => {
    const d = await MissionNoteModel.findOne({
        responderId: req.context.user!._id,
        missionId: req.params.id,
    });
    return res.send({
        data: d,
    });
});

// @route PATCH /api/responder/missions/:id
// @desc Update mission by ID
// @access Responder
r.patch("/:id", async (req, res) => {
    const d = await _Mission.UpdateOne(req.params.id, req.body);
    return res.send(d).status(d.error ? 406 : 200);
});

// @route PATCH /api/responder/missions/:id/accept
// @desc Accept mission
// @access Responder
r.patch("/:id/accept", async (req, res) => {
    const id = req.params.id as string;
    const responderId = req.context.user?._id;
    // have you accepted this mission already?
    const mission = (await (await _Mission.FetchOne(id)).data) as HydratedDocumentType<IMission>;
    if (mission?.confirmedResponderRequests.includes(responderId!))
        return res.status(406).send({
            error: "You have already accepted this mission",
        });
    await _Mission.UpdateOne(id, {
        confirmedResponderRequests: [...mission!.confirmedResponderRequests!, responderId!],
    });
    await _Mission.pushToEvents(id, responderId!);
    return res.send({
        data: "You are now confirmed for this mission!",
    });
});

// @route PATCH /api/responder/missions/:id/reject
// @desc Reject mission
// @access Responder
r.patch("/:id/reject", async (req, res) => {
    const id = req.params.id as string;
    const responderId = req.context.user?._id;

    const mission = (await (await _Mission.FetchOne(id)).data) as HydratedDocumentType<IMission>;

    await _Mission.UpdateOne(id, {
        confirmedResponderRequests: mission!.confirmedResponderRequests.filter((id) => id !== responderId),
        pendingResponderRequests: mission!.pendingResponderRequests.filter((id) => id !== responderId),
    });
    await _Mission.removeFromCalendar(id, responderId!);
    return res.send({
        data: "You have successfully rejected this mission!",
    });
});
