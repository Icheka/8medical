import { Router } from "express";
import AuthMiddleware from "../../middleware/auth";
import { _Enrollee } from "../../controllers";

export const ENROLLEE_ROUTER = Router();

const r = ENROLLEE_ROUTER;
const E = _Enrollee;
const AdminAuth = AuthMiddleware.adminAuth;

// @route GET /api/admin/enrollee
// @desc List all enrollees
// @access Admin
r.get(`/`, AdminAuth, async (req, res) => {
    const d = await E.FetchAll();

    if (d.error) return res.status(406).send(d);
    res.send(d);
});

// @route POST /api/admin/enrollee
// @desc Register enrollee
// @access Admin
r.post(`/`, AdminAuth, async (req, res) => {
    const d = await E.register(req.body);

    if (d.error) return res.status(406).send(d);
    res.send(d);
});

// @route GET /api/admin/enrollee/:id
// @desc Fetch enrollee by ID
// @access Admin
r.get(`/:id`, AdminAuth, async (req, res) => {
    const d = await E.FetchOne(req.params.id);

    if (d.error) return res.status(406).send(d);
    res.send(d);
});

// @route DELETE /api/admin/enrollee/:id
// @desc Delete enrollee by ID
// @access Admin
r.delete(`/:id`, AdminAuth, async (req, res) => {
    const d = await E.DeleteOne(req.params.id);

    if (d.error) return res.status(406).send(d);
    res.send(d);
});

// @route PATCH /api/admin/enrollee/:id
// @desc Update enrollee by ID
// @access Admin
r.patch(`/:id`, AdminAuth, async (req, res) => {
    const d = await E.UpdateOne(req.params.id, req.body);

    if (d.error) return res.status(406).send(d);
    res.send(d);
});
