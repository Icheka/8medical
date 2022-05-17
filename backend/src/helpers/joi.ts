import joi from "joi";

export const PhoneNumberValidationSchema = joi
    .string()
    .length(14)
    .pattern(/^[\+234]/);

class SchemaValidator {
    public static validate(schema: joi.AnySchema<any>, object: any) {
        try {
            const v = schema.validate(object);
            if (v.error) return [false, v.error.details[0].message];

            return [true, null];
        } catch (e) {
            return [false, "`schema` is not a Joi.AnySchema"];
        }
    }
}

export default SchemaValidator;
