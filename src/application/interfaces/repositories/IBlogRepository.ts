import { BlogEntity } from "@entities/BlogEntity";
import { CommentEntity } from "@entities/CommentEntity";
import { IGenericRepository } from "@interfaces/repositories/IGenericRepository";
import mongoose from "mongoose";

export interface IBlogRepository extends IGenericRepository<BlogEntity> {
    GetBlogComments(id: mongoose.Types.ObjectId): Promise<CommentEntity[]>;
    IncrementViews(id: mongoose.Types.ObjectId): Promise<BlogEntity>;
    AddCoAuthors(id: mongoose.Types.ObjectId, coAuthors: mongoose.Types.ObjectId[]): Promise<BlogEntity>;

}
