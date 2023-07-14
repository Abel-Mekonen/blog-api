import { IsMongoId, IsNotEmpty } from "class-validator"
import mongoose from "mongoose";

export class LikeDTO{
    constructor(user: mongoose.Types.ObjectId, blog: mongoose.Types.ObjectId){
        this.user = user;
        this.blog = blog;
    }

    @IsNotEmpty()
    @IsMongoId()
    user: mongoose.Types.ObjectId;

    @IsNotEmpty()
    @IsMongoId()
    blog: mongoose.Types.ObjectId;

}