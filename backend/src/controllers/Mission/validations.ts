import joi from "joi";
import { EMissionStatus, EMissionType } from "../../types";

const responderPermutation = joi.number().positive().optional();

export const MissionValidations = {
    createMission: joi.object({
        startTime: joi.date().required(),
        endTime: joi.date().optional(),
        status: joi
            .string()
            .optional()
            .valid(...Object.values(EMissionStatus)),
        address: joi.string().required(),
        totalEarning: joi.number().optional().positive(),
        description: joi.string().required(),
        rideType: joi
            .string()
            .required()
            .valid(...Object.values(EMissionType)),
        responderPermutations: joi
            .object({
                doctors: responderPermutation,
                nurses: responderPermutation,
                firstResponders: responderPermutation,
                paramedics: responderPermutation,
            })
            .optional(),
    }),
};
