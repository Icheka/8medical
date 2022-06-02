import { model, Schema } from "mongoose";
import { EInstitutionType, IInstitution } from "../../types";

export const InstitutionSchema = new Schema<IInstitution>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: false,
        },
        address: {
            type: String,
            required: false,
        },
        phone: {
            type: String,
            required: false,
        },
        type: {
            type: String,
            required: true,
            enum: Object.values(EInstitutionType),
            default: EInstitutionType.hospital,
        },
    },
    {
        timestamps: true,
    }
);

export const InstitutionModel = model("Institution", InstitutionSchema);
