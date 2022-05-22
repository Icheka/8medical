import { Router } from "express";
import { IResponderCalendar } from "../../types";
import AuthMiddleware from "../../middleware/auth";
import { _ResponderCalendar } from "../../controllers";

export const EVENTS_ROUTER = Router();

const r = EVENTS_ROUTER;
const ResponderAuth = AuthMiddleware.responderAuth;
const R = _ResponderCalendar;

// @route POST /api/responder/events
// @desc Add event to calendar
// @access Responder
r.post(`/`, ResponderAuth, async (req, res) => {
    const payload: IResponderCalendar = {
        ...req.body,
        responderId: req.context.user!._id,
    };

    const d = await R.addEvent(payload);
    return res.send(d).status(d.error ? 406 : 200);
});

// @route GET /api/responder/events
// @desc Fetch my events
// @access Responder
r.get(`/`, ResponderAuth, async (req, res) => {
    const d = await R.FetchManyBy({ responderId: req.context.user!._id });
    return res.send(d).status(d.error ? 406 : 200);
});

// @route PATCH /api/responder/events/:id
// @desc Update calendar event
// @access Responder
r.patch(`/:id`, ResponderAuth, async (req, res) => {
    const d = await R.UpdateOne(req.params.id, req.body);
    return res.send(d).status(d.error ? 406 : 200);
});

// @route GET /api/responder/events/:id
// @desc Fetch calendar event
// @access Responder
r.get(`/:id`, ResponderAuth, async (req, res) => {
    const d = await R.FetchOne(req.params.id);
    return res.send(d).status(d.error ? 406 : 200);
});

// @route DELETE /api/responder/events/:id
// @desc Delete calendar event
// @access Responder
r.delete(`/:id`, ResponderAuth, async (req, res) => {
    const d = await R.DeleteOne(req.params.id);
    return res.send(d).status(d.error ? 406 : 200);
});
