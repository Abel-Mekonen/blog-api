import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import mongoose from "mongoose";

export class CreateCommentDTO {
    constructor(content: string, blog: mongoose.Types.ObjectId, user: mongoose.Types.ObjectId) {
    }

    @IsNotEmpty()
    @IsString()
    content: string

    @IsNotEmpty()
    @IsMongoId()
    blog: mongoose.Types.ObjectId

    @IsNotEmpty()
    @IsMongoId()
    user: mongoose.Types.ObjectId
}