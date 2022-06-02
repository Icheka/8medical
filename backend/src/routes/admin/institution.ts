import { Router } from "express";
import AuthMiddleware from "../../middleware/auth";
import { _Institution } from "../../controllers";

export const INSTITUTION_ROUTER = Router();

const r = INSTITUTION_ROUTER;
const E = _Institution;
const AdminAuth = AuthMiddleware.adminAuth;

// @route GET /api/admin/institutions
// @desc List all institutions
// @access Admin
r.get(`/`, AdminAuth, async (req, res) => {
    const d = await E.FetchAll();

    if (d.error) return res.status(406).send(d);
    res.send(d);
});

// @route POST /api/admin/institution
// @desc Register institution
// @access Admin
r.post(`/`, AdminAuth, async (req, res) => {
    const d = await E.InsertOne(req.body);

    if (d.error) return res.status(406).send(d);
    res.send(d);
});

// @route GET /api/admin/institution/:id
// @desc Fetch institution by ID
// @access Admin
r.get(`/:id`, AdminAuth, async (req, res) => {
    const d = await E.FetchOne(req.params.id);

    if (d.error) return res.status(406).send(d);
    res.send(d);
});

// @route DELETE /api/admin/institution/:id
// @desc Delete institution by ID
// @access Admin
r.delete(`/:id`, AdminAuth, async (req, res) => {
    const d = await E.DeleteOne(req.params.id);

    if (d.error) return res.status(406).send(d);
    res.send(d);
});

// @route PATCH /api/admin/institution/:id
// @desc Update institution by ID
// @access Admin
r.patch(`/:id`, AdminAuth, async (req, res) => {
    const d = await E.UpdateOne(req.params.id, req.body);

    if (d.error) return res.status(406).send(d);
    res.send(d);
});
