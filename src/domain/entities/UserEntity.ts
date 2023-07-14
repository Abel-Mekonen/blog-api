import mongoose, { Schema } from "mongoose";
import { IBaseEntity } from "./BaseEntity";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export interface UserEntity extends IBaseEntity {
    fullName: string;
    email: string;
    password: string;
    blogs: mongoose.Schema.Types.ObjectId[];
    comments: mongoose.Schema.Types.ObjectId[];
}

let userSchema = new Schema<UserEntity>({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },  
}, { timestamps: true });

userSchema.pre<UserEntity>('save',async function (next) {
    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        return next();
    }catch(error){
        return next(error);
    }
});





export const User = mongoose.model<UserEntity>('User', userSchema);