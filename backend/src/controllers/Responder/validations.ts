import joi from "joi";
import { nameValidation, emailValidationSchema, passwordValidation } from "../../lib/validations";

export const ResponderValidations = {
    // signup
    SignUp: joi.object({
        firstName: nameValidation.required(),
        lastName: nameValidation.required(),
        middleName: nameValidation.optional().allow(""),
        email: emailValidationSchema.required(),
        password: passwordValidation.required(),
        phone: joi.string().optional().min(6).max(16).allow(null, ''),
    }),
};
