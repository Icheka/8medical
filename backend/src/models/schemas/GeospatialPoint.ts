import { Schema } from "mongoose";
import { IGeospatialPoint } from "../../types";

export const GeospatialPointSchema = new Schema<IGeospatialPoint>(
    {
        type: {
            type: String,
            required: true,
            enum: ["Point"],
            default: "Point",
        },
        coordinates: {
            type: [Number, Number],
        },
    },
    {
        timestamps: true,
    }
);
