// import { capsToSpace } from "../../../utils";
// import { MissionModel, ResponderModel } from "../../../models";
import { BackgroundWorker } from "../worker.class";
// import { EResponderTypes, IMissionTeamMember, IResponderPermutations } from "../../../types";

export const contactRespondersForMissionWorker = new BackgroundWorker("contact-responders-for-mission");

// export interface IContactRespondersForMissionWorkerConstructor {
//     missionId: string;
// }

// export class ContactRespondersForMissionWorker {
//     missionId: string;

//     constructor({ missionId }: IContactRespondersForMissionWorkerConstructor) {
//         this.missionId = missionId;

//         contactRespondersForMissionWorker
//             .processJobs()
//             .whenComplete(() => {
//                 console.log(`Job: 'find responders for mission ${missionId}' complete`);
//             })
//             .whenFail(() => {
//                 console.log(`Job: 'find responders for mission ${missionId}' failed`);
//             })
//             .addToQueue("contact-responders", {}, async (job) => contactRespondersForMission(missionId));
//     }
// }

// export const contactRespondersForMission = async (missionId: string) => {
//     // 1. find mission
//     // 2. what kind of mission is this?
//     // 3. determine personnel kinds/numbers for this kind of mission
//     // 4. determine kinds/numbers required to fill
//     // 5. contact responders

//     const mission = await MissionModel.findById(missionId);
//     if (!mission) return false;

//     const permutations = mission.responderPermutations;
//     const count = findCountOfResponders(mission.team);

//     for (const k of Object.keys(permutations)) {
//         const key = k as keyof IResponderPermutations;
//         if (count[key] < permutations[key]) {
//             const remainder = permutations[key] - count[key];

//             await ResponderModel.find({ responderTypes: capsToSpace(key), _id: { $nin: mission.respondersContacted } })
//                 .limit(remainder)
//                 .then((responders) => {
//                     console.log("responders ->", responders);
//                     // contact responders
//                 });
//         }
//     }
// };

// const findCountOfResponders = (team: Array<IMissionTeamMember>, count?: IResponderPermutations) => {
//     count = count ?? {
//         doctor: 0,
//         nurse: 0,
//         firstResponder: 0,
//         paramedic: 0,
//     };

//     for (const responder of team) {
//         let key: string;

//         if (responder.role !== EResponderTypes.firstResponder) key = responder.role;
//         else key = "firstResponder";

//         count[key as keyof IResponderPermutations]++;
//     }

//     return count;
// };
