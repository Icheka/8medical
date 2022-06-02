import { model, Schema } from "mongoose";
import { EEnrolleeStatus, IEnrollee } from "types/service-types/Enrollee";

export const EnrolleeSchema = new Schema<IEnrollee>(
    {
        address: {
            type: String,
            required: false,
        },
        bloodGroup: {
            type: String,
            required: false,
        },
        dateOfBirth: {
            type: Date,
            required: false,
        },
        email: {
            type: String,
            required: false,
        },
        gender: {
            type: String,
            required: false,
        },
        name: {
            type: String,
            required: true,
        },
        otherAddresses: {
            type: [String],
            required: true,
            default: [],
        },
        otherPhones: {
            type: [String],
            required: true,
            default: [],
        },
        phone: {
            type: String,
            required: false,
        },
        plan: {
            type: Number,
            required: false,
        },
        preExistingConditions: {
            type: [String],
            required: true,
            default: [],
        },
        profilePicture: {
            type: String,
            required: false,
        },
        publicId: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const EnrolleeModel = model("Enrollee", EnrolleeSchema);
