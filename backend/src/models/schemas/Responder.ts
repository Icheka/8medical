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
            required: false,
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
        address: {
            type: String,
            required: false,
        },
        idDocument: {
            type: Object,
            required: false,
        },
        driversLicence: {
            type: Object,
            required: false,
        },
        otherDocuments: {
            type: [Object],
            required: true,
            default: [],
        },
        accountVerified: {
            type: Boolean,
            required: true,
            default: false,
        },
        verificationRequestPending: {
            type: Boolean,
            required: true,
            default: false,
        },
        profilePicture: {
            type: String,
            required: false,
        },
        verifiedAt: {
            type: Date,
            required: false,
        },
        bankName: {
            type: String,
            required: false,
        },
        bankAccountName: {
            type: String,
            required: false,
        },
        bankAccountNumber: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

export const ResponderModel = model("Responder", ResponderSchema);
