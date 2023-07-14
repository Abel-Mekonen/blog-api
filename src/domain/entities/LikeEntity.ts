import mongoose from "mongoose";
import { IBaseEntity } from "./BaseEntity";

export interface LikeEntity extends IBaseEntity{
    blog: mongoose.Schema.Types.ObjectId;
    user: mongoose.Schema.Types.ObjectId;
}

let likeSchema = new mongoose.Schema<LikeEntity>({
    blog: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Blog' },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
}, { timestamps: true });

export const Like = mongoose.model<LikeEntity>('Like', likeSchema);