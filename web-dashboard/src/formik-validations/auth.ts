import * as Yup from "yup";

export const LoginValidations = Yup.object({
    email: Yup.string().email().required("This field is required"),
    password: Yup.string().required("This field is required"),
});
