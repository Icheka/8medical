import Joi from "joi";
import { emailValidationSchema } from "./common";

export const WaitListValidations = {
    InsertOne: Joi.object({
        email: emailValidationSchema.required(),
        referredBy: Joi.string().optional().allow("").allow(null),
    }),
};
