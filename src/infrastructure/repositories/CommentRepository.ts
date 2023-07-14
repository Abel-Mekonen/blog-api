import { BlogEntity } from "@entities/BlogEntity";
import { GenericRepository } from "./GenericRepository";
import { ICommentRepository } from "@interfaces/repositories/ICommentRepository";
import mongoose from "mongoose";
import { CommentEntity } from "@entities/CommentEntity";

export class CommentRepository
  extends GenericRepository<CommentEntity>
  implements ICommentRepository
{
    constructor( schema: mongoose.Model<CommentEntity>) {
        super(  schema );
    }
}