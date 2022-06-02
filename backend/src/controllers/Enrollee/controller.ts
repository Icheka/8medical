import SchemaValidator from "../../helpers/joi";
import { EnrolleeModel } from "../../models/schemas/Enrollee";
import { TControllerReturnType } from "../../types/controllers";
import { BaseModel } from "../../models";
import { IEnrollee } from "../../types/service-types/Enrollee";
import { EnrolleeValidations } from "./validations";

class Enrollee extends BaseModel<IEnrollee> {
    public async register(payload: Partial<IEnrollee>): Promise<TControllerReturnType> {
        const token = await this.generateUniqueToken(6);
        const publicId = `8MD-${token}`;
        const enrollee = await _Enrollee.InsertOne({ ...payload, publicId });

        return enrollee.inserted && !enrollee.error ? { data: enrollee.data } : { error: String(enrollee.error) };
    }

    public async generateUniqueToken(length: number): Promise<string> {
        length = length ?? 6;
        const token = (Math.random() * 10 ** length).toFixed(0);
        if (await EnrolleeModel.findOne({ publicId: token })) return this.generateUniqueToken(length);
        return token;
    }
}

export const _Enrollee = new Enrollee({
    model: EnrolleeModel,
    validations: EnrolleeValidations,
});
