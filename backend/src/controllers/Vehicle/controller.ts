import { TControllerReturnType } from "types";
import { BaseModel, VehicleModel } from "../../models";
import { IVehicle } from "../../types/service-types/Vehicle";

export class Vehicle extends BaseModel<IVehicle> {
    // register
    public async register(payload: Partial<IVehicle>): Promise<TControllerReturnType> {
        if (!payload.registrationPlate) return { error: "`registrationPlate` is required" };

        if (await (await _Vehicle.FetchOneBy({ registrationPlate: payload.registrationPlate })).data) return { error: "You cannot register another vehicle with an existing registration number" };

        const vehicle = await _Vehicle.InsertOne(payload);
        return { data: vehicle };
    }
}

export const _Vehicle = new Vehicle({
    model: VehicleModel,
    validations: {},
});
