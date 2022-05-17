import { Document } from "mongoose";

type SortFunction = (a: Document, b: Document) => number;

type ISortDocumentsBranchType = {
    byId: SortFunction;
};

type SortDocumentsObjectType = {
    asc: ISortDocumentsBranchType;
    desc: ISortDocumentsBranchType;
};

export const SortDocuments: SortDocumentsObjectType = {
    asc: {
        byId: (a, b) => {
            if (a._id > b._id) return 1;
            if (a._id < b._id) return -1;
            return 0;
        },
    },
    desc: {
        byId: (a, b) => {
            if (a._id > b._id) return -1;
            if (a._id < b._id) return 1;
            return 0;
        },
    },
};
