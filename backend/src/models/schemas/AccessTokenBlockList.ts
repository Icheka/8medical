import { model, Schema } from "mongoose";

export const AccessTokenBlockListSchema = new Schema(
    {
        token: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const AccessTokenBlockList = model("AccessTokenBlockList", AccessTokenBlockListSchema);
