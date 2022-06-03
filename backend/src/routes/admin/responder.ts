import { Router } from "express";
import AuthMiddleware from "../../middleware/auth";
import { _Responder } from "../../controllers";

export const RESPONDERS_ROUTER = Router();

const r = RESPONDERS_ROUTER;
const E = _Responder;
const AdminAuth = AuthMiddleware.adminAuth;

// @route GET /api/admin/responder
// @desc List all responders
// @access Admin
r.get(`/`, AdminAuth, async (req, res) => {
    const d = await E.FetchAll();

    if (d.error) return res.status(406).send(d);
    res.send(d);
});

// @route POST /api/admin/responder
// @desc Register responder
// @access Admin
r.post(`/`, AdminAuth, async (req, res) => {
    const d = await E.AdminRegister(req.body);

    if (d.error) return res.status(406).send(d);
    return res.send(d);
});

// @route GET /api/admin/responder/:id
// @desc Fetch responder by ID
// @access Admin
r.get(`/:id`, AdminAuth, async (req, res) => {
    const d = await E.FetchOne(req.params.id);

    if (d.error) return res.status(406).send(d);
    res.send(d);
});

// @route DELETE /api/admin/responder/:id
// @desc Delete responder by ID
// @access Admin
r.delete(`/:id`, AdminAuth, async (req, res) => {
    const d = await E.DeleteOne(req.params.id);

    if (d.error) return res.status(406).send(d);
    res.send(d);
});

// @route PATCH /api/admin/responder/:id
// @desc Update responder by ID
// @access Admin
r.patch(`/:id`, AdminAuth, async (req, res) => {
    console.log(req.body);
    const d = await E.UpdateOne(req.params.id, req.body);

    if (d.error) return res.status(406).send(d);
    res.send(d);
});
