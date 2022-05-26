import { Router } from "express";
import SchemaValidator from "../../helpers/joi";
import { ForgotPasswordClass, _Responder, _ResponderCalendar } from "../../controllers";
import AuthMiddleware from "../../middleware/auth";
import { URL } from "url";
import { IResponder } from "../../types";
import { ChangePasswordValidationSchema } from "../../lib/validations";
import { ExportResponderToPDF } from "../../lib/files";
import { keys } from "../../keys";

export const ACCOUNT_ROUTER = Router();

const r = ACCOUNT_ROUTER;
const R = _Responder;
const ResponderAuth = AuthMiddleware.responderAuth;

// @route GET /api/responder/account/export
// @desc Export profile
// @access Responder
r.get(`/export`, ResponderAuth, async (req, res) => {
    let formats: string | Array<string> = req.query.formats as string;
    if (!formats)
        return res
            .send({
                data: "A `formats` query parameter is required",
            })
            .status(406);

    formats = formats.split(",");

    const id = req.context.user!._id;
    const pdf: string | null = await (await new ExportResponderToPDF().setResponder(id)).export();

    const d = {
        pdf: pdf === null ? undefined : `${req.protocol}://${req.hostname}${keys.ENVIRONMENT.stage === "development" ? `:${keys.PORT}` : ""}/${pdf}`,
    };

    return res.send(d);
});

// @route PATCH /api/responder/account
// @desc Update profile
// @access Responder
r.patch(`/`, ResponderAuth, async (req, res) => {
    const d = await R.UpdateOne(req.context.user!._id, req.body);

    if (d.error) return res.status(406).send(d);
    res.send(d);
});

// @route PATCH /api/responder/account/password
// @desc Change password
// @access Responder
r.patch(`/password`, ResponderAuth, async (req, res) => {
    const [isValidSchema, validityError] = await SchemaValidator.validate(ChangePasswordValidationSchema, req.body);
    if (!isValidSchema) return res.status(406).send({ error: validityError });

    const d = await R.ChangePassword({
        id: req.context.user!._id,
        ...req.body,
    });

    if (d.error) return res.status(406).send(d);
    res.send(d);
});

// @route POST /api/responder/account/password
// @desc Reset password
// @access Responder
r.get(`/password`, async (req, res) => {
    const url: URL = new URL(process.env.APP_DOMAIN! + "/api" + req.url);
    const d = await ForgotPasswordClass.reset<IResponder>({
        link: url.search,
        model: R,
    });

    if (d.error) return res.status(406).send(d);
    res.send(d);
});

// @route POST /api/responder/account/password
// @desc Get 'reset password' link
// @access Responder
r.post(`/password`, async (req, res) => {
    const user = req.context?.user;
    if (user && user._id) req.body.id = user._id;
    const d = await R.ForgotPassword(req.body);

    if (d.error) return res.status(406).send(d);
    res.send(d);
});

// @route GET /api/responder/account
// @desc Whoami
// @access Responder
r.get(`/`, ResponderAuth, async (req, res) => {
    const d = await R.FetchOne(req.context.user!._id);

    if (d.error) res.status(406).send(d);
    else res.send(d);
});

// @route POST /api/responder/account/verify/:id
// @desc Verify email
// @access Public
r.get(`/verify/:id`, async (req, res) => {
    const d = await R.VerifyEmail(req.params.id);

    if (d.error) res.status(406).send(d);
    else res.send(d);
});

// @route POST /api/responder/account/sign-in
// @desc Sign in to Responder account
// @access Public
r.post(`/sign-in`, async (req, res) => {
    const d = await R.SignIn({ payload: req.body });

    if (d.error) {
        res.status(406).send(d);
    } else {
        // maxAge: 5 days in milliseconds
        res.cookie("responder-auth", d.data.token, {
            maxAge: 3600 * 24 * 5 * 1000,
            httpOnly: true,
            sameSite: true,
            secure: true,
        });
        res.send(d);
    }
});

// @route POST /api/responder/account
// @desc Sign up as a Responder
// @access Public
r.post("/", async (req, res) => {
    const d = await R.SignUp(req.body);
    return res.send(d).status(d.error ? 406 : 200);
});
