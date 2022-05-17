import SchemaValidator from "../helpers/joi";
import Joi from "joi";
import { DeleteResult, UpdateResult } from "mongodb";
import { HydratedDocument, Model, Schema } from "mongoose";

type ModelType<T> = Model<T, {}, {}, {}>;
export type HydratedDocumentType<T> = HydratedDocument<T, {}, {}> | null;
export type FetchOpReturnType<T> = {
    data: HydratedDocumentType<T> | Array<HydratedDocumentType<T>>;
    error?: string;
};
export type DeleteOpReturnType<T> = {
    data: DeleteResult | null;
    error?: string;
};
export type InsertOpReturnType<T> = {
    inserted: boolean;
    error?: string | null | boolean;
    data?: HydratedDocumentType<T> | Array<HydratedDocumentType<T>>;
};
export type UpdateOpReturnType<T> = {
    data?: UpdateResult;
    error?: string;
    updated: boolean;
};

interface IBaseModel<T> {
    // model
    model: ModelType<T>;

    // insert
    InsertOne: (obj: Partial<T>, options?: { validatorName?: string }) => Promise<InsertOpReturnType<T>>;
    InsertMany: (objs: Array<T>) => Promise<InsertOpReturnType<T>>;

    // fetch
    FetchOne: (id: string) => Promise<FetchOpReturnType<T>>;
    FetchOneBy: (query: Record<string, any>) => Promise<FetchOpReturnType<T>>;
    FetchMany: (ids: Array<string>) => Promise<FetchOpReturnType<T>>;
    FetchManyBy: (query: Record<string, any>) => Promise<FetchOpReturnType<T>>;
    FetchAll: () => Promise<FetchOpReturnType<T>>;

    // update
    UpdateOne: (id: string, obj: Partial<T>) => Promise<FetchOpReturnType<T>>;
    UpdateMany: (ids: Array<string>, obj: Partial<T>) => Promise<UpdateOpReturnType<T>>;
    UpdateAll: (obj: Partial<T>) => Promise<UpdateOpReturnType<T>>;

    // delete
    DeleteOne: (id: string) => Promise<FetchOpReturnType<T>>;
    DeleteMany: (ids: Array<string>) => Promise<DeleteOpReturnType<T>>;
    DeleteAll: () => Promise<DeleteOpReturnType<T>>;

    // validations
    validations: Record<string, Joi.Schema>;
}

export class BaseModel<T> implements IBaseModel<T> {
    model: ModelType<T>;
    validations: Record<string, Joi.Schema>;

    constructor({ model, validations }: { model: ModelType<T>; validations: Record<string, Joi.Schema> }) {
        this.model = model;
        this.validations = validations;
    }

    InsertOne: (obj: Partial<T>, options?: { validatorName?: string }) => Promise<InsertOpReturnType<T>> = async (obj, options) => {
        const validatorName = options?.validatorName ?? "InsertOne";

        const [isValid, validationError] = this.tryValidation(validatorName, obj);
        if (isValid === false) return Promise.resolve({ inserted: false, error: validationError });

        try {
            const newObject = new this.model(obj);
            const r = await newObject.save();
            if (r._id) {
                return { inserted: true, data: newObject };
            } else {
                console.log("Joe's problem!!!");
                return { inserted: false, error: "An error occurred!" };
            }
        } catch (err) {
            return { inserted: false, error: String(err) };
        }
    };

    InsertMany: (objs: Array<T>) => Promise<InsertOpReturnType<T>> = async (objs) => {
        try {
            const res = await this.model.insertMany(objs);
            return { inserted: true, data: res };
        } catch (err) {
            return { inserted: false, error: String(err) };
        }
    };

    FetchOne: (id: string) => Promise<FetchOpReturnType<T>> = async (id) => {
        try {
            const data = await this.model.findById(id);
            return { data };
        } catch (error) {
            return { error: error as string, data: null };
        }
    };

    FetchOneBy: (query: Record<string, any>) => Promise<FetchOpReturnType<T>> = async (query) => {
        try {
            const data = await this.model.findOne(query);
            if (data === null) return { error: "No records found", data: null };
            return { data };
        } catch (error) {
            return { error: error as string, data: null };
        }
    };

    FetchManyBy: (query: Record<string, any>) => Promise<FetchOpReturnType<T>> = async (query) => {
        try {
            const data = await this.model.find(query);
            return { data };
        } catch (error) {
            return { error: error as string, data: null };
        }
    };

    FetchMany: (ids: Array<string>) => Promise<FetchOpReturnType<T>> = async (ids) => {
        try {
            const data = await this.model.find(ids);
            return { data };
        } catch (error) {
            return { error: error as string, data: null };
        }
    };

    FetchAll: () => Promise<FetchOpReturnType<T>> = async () => {
        try {
            const data = await this.model.find();
            return { data };
        } catch (err) {
            return { error: err as string, data: null };
        }
    };

    DeleteOne: (id: string) => Promise<FetchOpReturnType<T>> = async (id) => {
        try {
            const res = await this.model.findByIdAndDelete(id);
            return { data: res };
        } catch (err) {
            return { error: err as string, data: null };
        }
    };

    DeleteMany: (ids: Array<string>) => Promise<DeleteOpReturnType<T>> = async (ids) => {
        try {
            const res = await this.model.deleteMany(ids);
            return { data: res };
        } catch (err) {
            return { error: err as string, data: null };
        }
    };

    DeleteAll: () => Promise<DeleteOpReturnType<T>> = async () => {
        try {
            const res = await this.model.deleteMany();
            return { data: res };
        } catch (err) {
            return { error: err as string, data: null };
        }
    };

    UpdateOne: (id: string, obj: Partial<T>) => Promise<FetchOpReturnType<T>> = async (id, obj) => {
        try {
            const res = await this.model.findByIdAndUpdate(id, obj);
            return { data: res };
        } catch (err) {
            return { error: err as string, data: null };
        }
    };

    UpdateMany: (ids: Array<string>, obj: Partial<T>) => Promise<UpdateOpReturnType<T>> = async (ids, obj) => {
        try {
            const res = await this.model.updateMany({ _id: ids }, obj);
            return { data: res, updated: true };
        } catch (err) {
            return { error: err as string, updated: false };
        }
    };

    UpdateAll: (obj: Partial<T>) => Promise<UpdateOpReturnType<T>> = async (obj) => {
        try {
            const res = await this.model.updateMany({}, obj);
            return { data: res, updated: true };
        } catch (err) {
            return { error: err as string, updated: false };
        }
    };

    // private
    getValidation(key: string) {
        const validation = Object.entries(this.validations).find(([k]) => k === key);
        if (validation !== undefined) return validation[1];
        return undefined;
    }
    tryValidation(key: string, obj: any) {
        const validation = this.getValidation(key);

        // allow the operation to proceed even though no validation was executed
        if (validation === undefined) return [true, "No validation schema was provided"];

        return SchemaValidator.validate(validation, obj);
    }
}
