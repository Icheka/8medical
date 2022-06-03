import { _Admin } from "../../controllers/Admin";
import { Router } from "express";
import AuthMiddleware from "../../middleware/auth";
import { URL } from "url";
import { ForgotPasswordClass } from "../../controllers";
import { IAdmin } from "../../types";
import SchemaValidator from "../../helpers/joi";
import { ChangePasswordValidationSchema } from "../../lib/validations";
import { AccessTokenBlockList } from "../../models/schemas/AccessTokenBlockList";

export const ACCOUNT_ROUTER = Router();

const r = ACCOUNT_ROUTER;
const A = _Admin;
const AdminAuth = AuthMiddleware.adminAuth;

// @route PATCH /api/admin/account
// @desc Update profile
// @access Admin
r.patch(`/`, AdminAuth, async (req, res) => {
    const d = await A.UpdateOne(req.context.user!._id, req.body);

    if (d.error) return res.status(406).send(d);
    res.send(d);
});

// @route PATCH /api/admin/account/password
// @desc Change password
// @access Admin
r.patch(`/password`, AdminAuth, async (req, res) => {
    const [isValidSchema, validityError] = await SchemaValidator.validate(ChangePasswordValidationSchema, req.body);
    if (!isValidSchema) return res.status(406).send({ error: validityError });

    const d = await A.ChangePassword({
        id: req.context.user!._id,
        ...req.body,
    });

    if (d.error) return res.status(406).send(d);
    res.send(d);
});

// @route POST /api/admin/account/password
// @desc Reset password
// @access Admin
r.get(`/password`, async (req, res) => {
    const url: URL = new URL(process.env.APP_DOMAIN! + "/api" + req.url);
    const d = await ForgotPasswordClass.reset<IAdmin>({
        link: url.search,
        model: A,
    });

    if (d.error) return res.status(406).send(d);
    res.send(d);
});

// @route POST /api/admin/account/password
// @desc Get 'reset password' link
// @access Admin
r.post(`/password`, AdminAuth, async (req, res) => {
    const user = req.context?.user;
    if (user && user._id) req.body.id = user._id;
    const d = await A.ForgotPassword(req.body);

    if (d.error) return res.status(406).send(d);
    res.send(d);
});

// @route GET /api/admin/account
// @desc Whoami
// @access Admin
r.get(`/`, AdminAuth, async (req, res) => {
    const d = await A.FetchOne(req.context.user!._id);

    if (d.error) res.status(406).send(d);
    else res.send(d);
});

// @route POST /api/admin/account/verify/:id
// @desc Verify email
// @access Public
r.get(`/verify/:id`, async (req, res) => {
    const d = await A.VerifyEmail(req.params.id);

    if (d.error) res.status(406).send(d);
    else res.send(d);
});

// @route POST /api/admin/account/sign-in
// @desc Sign in to Admin account
// @access Public
r.post(`/sign-in`, async (req, res) => {
    const d = await A.SignIn({ payload: req.body });

    if (d.error) {
        res.status(406).send(d);
    } else {
        // maxAge: 5 days in milliseconds
        res.cookie("admin-auth", d.data.token, {
            maxAge: 3600 * 24 * 5 * 1000,
            httpOnly: true,
            sameSite: true,
            secure: true,
        });
        res.send(d);
    }
});

// @route POST /api/admin/account
// @desc Sign up as an Admin
// @access Public
r.post("/", async (req, res) => {
    const d = await A.SignUp(req.body);

    return res.status(d.error ? 406 : 200).send(d);
});

// @route GET /api/admin/account/revoke
// @desc Sign out as a Admin
// @access Admin
r.get("/revoke", AdminAuth, async (req, res) => {
    res.clearCookie("admin-auth");
    const token = new AccessTokenBlockList({ token: req.headers.authorization?.split(" ")[1] });
    token.save();

    return res.send();
});
