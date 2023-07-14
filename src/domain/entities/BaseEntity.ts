import mongoose from "mongoose";

export interface IBaseEntity {
    createdBy: mongoose.Schema.Types.ObjectId | undefined;
}
