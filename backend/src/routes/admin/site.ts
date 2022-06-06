import { Router } from "express";
import { InstitutionModel, MissionModel, ResponderModel } from "../../models";
import { EnrolleeModel } from "../../models/schemas/Enrollee";
import { _Mission } from "../../controllers";
import { isAfter, isBefore } from "date-fns";

export const SITE_ROUTER = Router();

const r = SITE_ROUTER;
const M = _Mission;

// @route GET /api/admin/site/site-statistics
// @desc Site statistics
// @access Admin
r.get("/site-statistics", async (req, res) => {
    const data = await await Promise.all([EnrolleeModel.count(), ResponderModel.count(), InstitutionModel.count(), 0]);
    return res.send({ data });
});

// @route GET /api/admin/site/ride-statistics
// @desc Ride statistics
// @access Admin
r.get("/ride-statistics", async (req, res) => {
    const data = await await Promise.all([
        0,
        MissionModel.find().then((data) => {
            data = data ?? [];
            const now = new Date();
            data = data.filter((d) => {
                return isAfter(now, d.startTime) && (!d.endTime || isBefore(now, d.endTime));
            });
            return data.length;
        }),
        MissionModel.count(),
        0,
    ]);
    return res.send({ data });
});
