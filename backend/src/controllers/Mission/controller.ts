import { ContactRespondersForMissionWorker } from "../../lib/workers/workers/getRespondersForMission";
import SchemaValidator from "../../helpers/joi";
import { BaseModel, HydratedDocumentType, MissionModel } from "../../models";
import { IMission, TControllerReturnType } from "../../types";
import { MissionValidations } from "./validations";
import { _Responder } from "../Responder";

class Mission extends BaseModel<IMission> {
    // get missions for responder
    public async missionsForResponder(responderId: string) {
        return MissionModel.find({
            team: {
                $elemMatch: {
                    id: responderId,
                },
            },
        });
    }

    // create ride
    public async createMission(payload: Partial<IMission>): Promise<TControllerReturnType> {
        const [isValid, error] = SchemaValidator.validate(MissionValidations.createMission, payload);
        if (!isValid) return { error: String(error) };

        const mission = await this.InsertOne(payload);

        new ContactRespondersForMissionWorker({ missionId: (mission.data as HydratedDocumentType<IMission>)!._id });

        return { data: mission };
    }
}

export const _Mission = new Mission({
    model: MissionModel,
    validations: {},
});
