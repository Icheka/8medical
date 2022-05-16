import * as Yup from "yup";
import { newPasswordValidation } from "./auth";

export const ProfileDetailsValidations = Yup.object({
    email: Yup.string().email('Enter a valid email').required("This field is required"),
    firstName: Yup.string().required("This field is required"),
    lastName: Yup.string().required("This field is required"),
    address: Yup.string().required("This field is required"),
});

export const AccountDetailsValidations = Yup.object({
    bank: Yup.string().required("This field is required"),
    accountName: Yup.string().required("This field is required"),
    accountNumber: Yup.number().required("This field is required"),
});

export const ChangePasswordValidations = Yup.object({
    currentPassword: newPasswordValidation,
    newPassword: newPasswordValidation,
    confirmPassword: newPasswordValidation,
});
