import { Router } from "express";
import { IResponderCalendar } from "../../types";
import AuthMiddleware from "../../middleware/auth";
import { _ResponderCalendar } from "../../controllers";
import { HydratedDocumentType } from "models";

export const EVENTS_ROUTER = Router();

const r = EVENTS_ROUTER;
const ResponderAuth = AuthMiddleware.responderAuth;
const R = _ResponderCalendar;

// @route POST /api/responder/events
// @desc Add event to calendar
// @access Responder
r.post(`/`, ResponderAuth, async (req, res) => {
    const events = req.body.events.map((event: any) => ({ ...event, responderId: req.context.user!._id }));

    const d = await R.addEvents(events);
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

// @route DELETE /api/responder/events
// @desc Clear schedule
// @access Responder
r.delete(`/`, ResponderAuth, async (req, res) => {
    const ids: Array<string> = ((await R.FetchManyBy({ responderId: req.context.user!._id })).data as Array<HydratedDocumentType<IResponderCalendar>>).map((event) => String(event!._id));
    const d = await R.DeleteMany(ids);
    return res.send(d).status(d.error ? 406 : 200);
});

// @route DELETE /api/responder/events/:id
// @desc Delete calendar event
// @access Responder
r.delete(`/:id`, ResponderAuth, async (req, res) => {
    const d = await R.DeleteOne(req.params.id);
    return res.send(d).status(d.error ? 406 : 200);
});
