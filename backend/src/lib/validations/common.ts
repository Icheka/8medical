import Joi from "joi";

export const emailValidationSchema = Joi.string().email();
export const requiredValidation = (schema: Joi.Schema) => schema.required();
export const nameValidation = Joi.string().max(64);
export const passwordValidation = Joi.string().min(6).max(128);
export const phoneValidation = Joi.string().min(6).max(16);

export const ChangePasswordValidationSchema = Joi.object({
    oldPassword: passwordValidation.required(),
    newPassword: passwordValidation.required(),
});
