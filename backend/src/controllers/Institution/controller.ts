import { TControllerReturnType } from "types";
import { BaseModel, InstitutionModel } from "../../models";
import { IInstitution } from "../../types/service-types/Institution";

export class Institution extends BaseModel<IInstitution> {}

export const _Institution = new Institution({
    model: InstitutionModel,
    validations: {},
});
