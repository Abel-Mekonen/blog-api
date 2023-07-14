import { LikeEntity } from "@entities/LikeEntity";
import { GenericRepository } from "./GenericRepository";
import { ILikeRepository } from "@interfaces/repositories/ILikeRepository";
import mongoose from "mongoose";
import { BlogEntity } from "@entities/BlogEntity";
import { LikeDTO } from "@dtos/likeDTO";
import { BadRequestError } from "@error-custom/BadRequestError";


export class LikeRepository extends GenericRepository<LikeEntity> implements ILikeRepository{
    private _blogSchema: mongoose.Model<BlogEntity>
    constructor(schema: mongoose.Model<LikeEntity>, blogSchema: mongoose.Model<BlogEntity>){
        super(schema);
        this._blogSchema = blogSchema;
    }

   async LikeBlog(likeDto: LikeDTO): Promise<LikeEntity> {
        console.log("likeDto", likeDto)
        const blog = await this._blogSchema.findById(likeDto.blog);
        console.log("blog", blog)
        const likedBefore = blog.likedBy.includes(likeDto.user);
        if(likedBefore){
            throw new BadRequestError("User already liked this blog");
        }
        const like = this._schema.create(likeDto);
        await this._blogSchema.findByIdAndUpdate(likeDto.blog, {$inc: {likes: 1}, $push: {likedBy: likeDto.user}});
        return like;
    }
}