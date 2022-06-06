// import { ContactRespondersForMissionWorker } from "../../lib/workers/workers/getRespondersForMission";
import SchemaValidator from "../../helpers/joi";
import { BaseModel, HydratedDocumentType, MissionModel, MissionNoteModel, ResponderCalendarModel } from "../../models";
import { EResponderCalendarEventType, IMission, TControllerReturnType } from "../../types";
import { MissionValidations } from "./validations";
import { _Responder } from "../Responder";
import { io } from "../../app";
import { addHours } from "date-fns";

class Mission extends BaseModel<IMission> {
    // add note (responder)
    public async addNote(responderId: string, missionId: string, text: string) {
        // previously-saved note?
        let note = await MissionNoteModel.findOne({ missionId, responderId });
        if (note) {
            note.text = text;
        } else {
            note = new MissionNoteModel({
                missionId,
                responderId,
                text,
            });
        }
        note.save();
    }

    // push to events for responder
    public async pushToEvents(id: string, responderId: string) {
        const mission: HydratedDocumentType<IMission> = (await (await this.FetchOne(id)).data) as HydratedDocumentType<IMission>;
        if (!mission) return;
        const event = new ResponderCalendarModel({
            start: mission?.startTime,
            end: mission?.endTime ?? addHours(new Date(mission.startTime), 1),
            responderId,
            title: mission?.description,
            type: EResponderCalendarEventType.mission,
            missionId: id,
        });
        event.save();
    }

    // remove from calendar
    public async removeFromCalendar(id: string, responderId: string) {
        const event = await ResponderCalendarModel.findOne({
            missionId: id,
            responderId,
        });
        if (!event) return;
        event?.delete();
    }

    // get missions for responder
    public async missionsForResponder(responderId: string) {
        return MissionModel.find({
            confirmedResponderRequests: responderId,
        });
    }

    // create ride
    public async createMission(payload: Partial<IMission>): Promise<TControllerReturnType> {
        // const [isValid, error] = SchemaValidator.validate(MissionValidations.createMission, payload);
        // if (!isValid) return { error: String(error) };

        const mission = await this.InsertOne(payload);

        // new ContactRespondersForMissionWorker({ missionId: (mission.data as HydratedDocumentType<IMission>)!._id });
        this.sendIONotificatioForPendingResponders((mission.data as any)._id, mission.data as HydratedDocumentType<IMission>);

        return { data: mission };
    }

    // send IO notification for pending assignees
    public async sendIONotificatioForPendingResponders(id: string, mission?: HydratedDocumentType<IMission> | IMission) {
        if (!mission) mission = (await (await this.FetchOne(id)).data!) as HydratedDocumentType<IMission>;
        if (mission?.completed || mission?.pendingResponderRequests.length === 0) return;

        console.log("=====> Sending notification for new mission <=====");

        io.emit("new mission", {
            for: "responders",
            name: "new mission",
            payload: mission,
        });
    }
}

export const _Mission = new Mission({
    model: MissionModel,
    validations: {},
});
