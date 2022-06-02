import { model, Schema } from "mongoose";
import { EAccountActivityStatus, EUserAccountTypes, IAdmin } from "../../types";

export const AdminSchema = new Schema<IAdmin>(
    {
        accountType: {
            type: String,
            required: true,
            default: EUserAccountTypes.Admin,
        },
        activityStatus: {
            type: String,
            required: true,
            default: EAccountActivityStatus.Active,
        },
        email: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        middleName: {
            type: String,
            required: false,
        },
        emailVerified: {
            type: Boolean,
            required: true,
            default: false,
        },
        password: {
            type: String,
            required: true,
        },
        expoPushTokens: {
            type: [String],
            required: true,
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

export const AdminModel = model("Admin", AdminSchema);
