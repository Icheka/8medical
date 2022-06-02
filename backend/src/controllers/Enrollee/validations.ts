import joi from "joi";

export const EnrolleeValidations = {
    register: joi.object({
        name: joi.string().required().min(1),
    }),
};
