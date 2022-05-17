import { BaseModel, ResponderModel } from "../../models";
import { IResponder } from "../../types";

class Responder extends BaseModel<IResponder> {}

export const _Responder = new Responder({
    model: ResponderModel,
    validations: {},
});
