import { model, Schema } from "mongoose";
import { EVehicleType, IVehicle } from "../../types/service-types/Vehicle";

export const VehicleSchema = new Schema<IVehicle>(
    {
        registrationPlate: {
            type: String,
            required: true,
        },
        assignedTo: {
            type: String,
            required: false,
        },
        costPerKm: {
            type: Number,
            required: false,
        },
        status: {
            type: String,
            required: true,
            default: "approved",
        },
        type: {
            type: String,
            required: true,
            enum: Object.values(EVehicleType),
            default: EVehicleType.cycle,
        },
    },
    {
        timestamps: true,
    }
);

export const VehicleModel = model("Vehicle", VehicleSchema);
