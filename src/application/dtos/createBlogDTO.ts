import { IsArray, IsMongoId, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import mongoose, { Types } from "mongoose";

export class CreateBlogDTO {
    constructor(title: string, content: string, user: mongoose.Types.ObjectId, coAuthors: mongoose.Types.ObjectId[]) {
        this.title = title;
        this.content = content;
        this.author = user;
        this.coAuthors = coAuthors;
    }

    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    content: string

    @IsNotEmpty()
    @IsMongoId()
    author: mongoose.Types.ObjectId

    @IsArray()
    @ValidateNested({ each: true })
    coAuthors: mongoose.Types.ObjectId[]

}