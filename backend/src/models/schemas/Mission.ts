import { model, Schema } from "mongoose";
import { EMissionStatus, EMissionType, IMissionTeamMember, IMission, EResponderTypes, IMissionNote } from "../../types";
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
        pendingResponderRequests: {
            type: [String],
            required: true,
            default: [],
        },
        rideType: {
            type: String,
            enum: Object.values(EMissionType),
            required: true,
        },
        confirmedResponderRequests: {
            type: [String],
            required: true,
            default: [],
        },
        responderPermutations: {
            type: {},
            required: true,
            default: {
                doctor: 0,
                firstResponder: 0,
                nurse: 0,
                paramedic: 0,
            },
        },
        completed: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const MissionNoteSchema = new Schema<IMissionNote>(
    {
        adminId: {
            type: String,
            required: false,
        },
        responderId: {
            type: String,
            required: false,
        },
        missionId: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

export const MissionModel = model("Mission", MissionSchema);
export const MissionNoteModel = model("MissionNote", MissionNoteSchema);
