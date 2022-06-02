import { Router } from "express";
import AuthMiddleware from "../../middleware/auth";
import { _Vehicle } from "../../controllers";

export const VEHICLE_ROUTER = Router();

const r = VEHICLE_ROUTER;
const E = _Vehicle;
const AdminAuth = AuthMiddleware.adminAuth;

// @route GET /api/admin/vehicle
// @desc List all vehicles
// @access Admin
r.get(`/`, AdminAuth, async (req, res) => {
    const d = await E.FetchAll();

    if (d.error) return res.status(406).send(d);
    res.send(d);
});

// @route POST /api/admin/vehicle
// @desc Register vehicle
// @access Admin
r.post(`/`, AdminAuth, async (req, res) => {
    const d = await E.register(req.body);

    if (d.error) return res.status(406).send(d);
    res.send(d);
});

// @route GET /api/admin/vehicle/:id
// @desc Fetch vehicle by ID
// @access Admin
r.get(`/:id`, AdminAuth, async (req, res) => {
    const d = await E.FetchOne(req.params.id);

    if (d.error) return res.status(406).send(d);
    res.send(d);
});

// @route DELETE /api/admin/vehicle/:id
// @desc Delete vehicle by ID
// @access Admin
r.delete(`/:id`, AdminAuth, async (req, res) => {
    const d = await E.DeleteOne(req.params.id);

    if (d.error) return res.status(406).send(d);
    res.send(d);
});

// @route PATCH /api/admin/vehicle/:id
// @desc Update vehicle by ID
// @access Admin
r.patch(`/:id`, AdminAuth, async (req, res) => {
    const d = await E.UpdateOne(req.params.id, req.body);

    if (d.error) return res.status(406).send(d);
    res.send(d);
});
