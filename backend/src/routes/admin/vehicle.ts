import { Router } from "express";
import AuthMiddleware from "../../middleware/auth";
import { _Responder, _Vehicle } from "../../controllers";
import { IVehicle } from "types";
import { HydratedDocumentType } from "models";

export const VEHICLE_ROUTER = Router();

const r = VEHICLE_ROUTER;
const E = _Vehicle;
const AdminAuth = AuthMiddleware.adminAuth;

// @route GET /api/admin/vehicle
// @desc List all vehicles
// @access Admin
r.get(`/`, AdminAuth, async (req, res) => {
    let d = await E.FetchAll();

    if (d.error) return res.status(406).send(d);
    const data = [];
    for (const vehicle of d.data as Array<HydratedDocumentType<IVehicle>>) {
        const responder = await _Responder.FetchOneBy({ _id: vehicle?.assignedTo });
        if (responder.error) data.push(vehicle);
        data.push({ ...vehicle, responder: responder.data });
    }
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
