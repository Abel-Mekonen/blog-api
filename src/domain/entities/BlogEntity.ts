import mongoose, { Schema, mongo } from "mongoose";
import { IBaseEntity } from "./BaseEntity";


export interface BlogEntity extends IBaseEntity {
    title: string;
    content: string;
    author: mongoose.Schema.Types.ObjectId;
    views: Number;
    likes: Number;
    likedBy: mongoose.Types.ObjectId[];
    coAuthors: mongoose.Types.ObjectId[];
    comments: mongoose.Types.ObjectId[];
}

let blogSchema = new Schema<BlogEntity>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    likedBy: [{ type: mongoose.Types.ObjectId, ref: 'User', default: []  }],
    coAuthors: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });




export const Blog =  mongoose.model<BlogEntity>('Blog', blogSchema);