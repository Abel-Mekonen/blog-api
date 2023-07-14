import mongoose from "mongoose";
import { IBaseEntity } from "./BaseEntity";

export interface CommentEntity extends IBaseEntity {
    content: string;
    blog: mongoose.Schema.Types.ObjectId;
    user: mongoose.Schema.Types.ObjectId;
}

let commentSchema = new mongoose.Schema<CommentEntity>({
    content: { type: String, required: true },
    blog: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Blog' },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
}, { timestamps: true });


export const Comment =  mongoose.model<CommentEntity>('Comment', commentSchema);