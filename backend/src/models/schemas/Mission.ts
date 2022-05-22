import { model, Schema } from "mongoose";
import { EMissionStatus, EMissionType, IMissionTeamMember, IMission, EResponderTypes } from "../../types";
import { GeospatialPointSchema } from ".";

export const MissionSchema = new Schema<IMission>(
    {
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: false,
        },
        status: {
            type: String,
            enum: Object.values(EMissionStatus),
            required: true,
            default: EMissionStatus.scheduled,
        },
        address: {
            type: String,
            required: true,
        },
        stops: {
            type: [GeospatialPointSchema],
        },
        totalEarning: {
            type: Number,
            required: false,
        },
        description: {
            type: String,
            required: true,
        },
        respondersContacted: {
            type: [String],
            required: true,
            default: [],
        },
        rideType: {
            type: String,
            enum: Object.values(EMissionType),
            required: true,
        },
        team: {
            type: [],
            required: true,
            default: [],
        },
        responderPermutations: {
            type: {},
            required: true,
            default: {
                doctors: 0,
                firstResponders: 0,
                nurses: 0,
                paramedics: 0,
            },
        },
    },
    {
        timestamps: true,
    }
);

export const MissionModel = model("Mission", MissionSchema);
