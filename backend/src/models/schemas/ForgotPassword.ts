import { model, Schema } from "mongoose";
import { TForgotPassword } from "../../types";

export const ForgotPasswordSchema = new Schema<TForgotPassword>(
    {
        link: {
            type: String,
            required: true,
        },
        isUsed: {
            type: Boolean,
            required: true,
            default: false,
        },
        email: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const ForgotPasswordModel = model("ForgotPassword", ForgotPasswordSchema);
