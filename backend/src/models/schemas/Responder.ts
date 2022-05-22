import { model, Schema } from "mongoose";
import { EAccountActivityStatus, IResponder } from "../../types";

export const ResponderSchema = new Schema<IResponder>(
    {
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
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        emailVerified: {
            type: Boolean,
            required: true,
            default: false,
        },
        activityStatus: {
            type: String,
            enum: Object.values(EAccountActivityStatus),
            required: true,
            default: EAccountActivityStatus.Inactive,
        },
        expoPushTokens: {
            type: [String],
            required: true,
            default: [],
        },
        responderTypes: {
            type: [String],
            required: false,
        },
        gender: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

export const ResponderModel = model("Responder", ResponderSchema);
