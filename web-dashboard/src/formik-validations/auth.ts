import * as Yup from "yup";

export const passwordValidation = Yup.string().required("This field is required");
export const newPasswordValidation = passwordValidation.min(6, "Password must be at least 6 characters long");

export const LoginValidations = Yup.object({
    email: Yup.string().email().required("This field is required"),
    password: newPasswordValidation,
});
