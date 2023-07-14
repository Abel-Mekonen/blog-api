import { BlogEntity } from "@entities/BlogEntity";
import { GenericRepository } from "./GenericRepository";
import { IBlogRepository } from "@interfaces/repositories/IBlogRepository";
import mongoose, { Schema, Types, mongo } from "mongoose";
import { CommentEntity } from "@entities/CommentEntity";
import { UserEntity } from "@entities/UserEntity";
import { NotFoundError } from "@error-custom/NotFoundError";

export class BlogRepository
  extends GenericRepository<BlogEntity>
  implements IBlogRepository
{
    private _userSchema: mongoose.Model<UserEntity>;
    private _commentSchema: mongoose.Model<CommentEntity>;
    constructor( 
      schema: mongoose.Model<BlogEntity>, 
      commentSchema: mongoose.Model<CommentEntity>, 
      userSchema: mongoose.Model<UserEntity>) {
        super( schema );
        this._commentSchema = commentSchema;
        this._userSchema = userSchema;
    }

    async AddCoAuthors(id: Types.ObjectId, coAuthors: Types.ObjectId[]): Promise<BlogEntity> {
        const blog = await this._schema.findById(id);
        if(!blog) throw new NotFoundError(`Blog with id ${id} not found `);
        
        const coAuthorsEntities = await this._userSchema.find({_id: {$in: coAuthors}});
        const coAuthorsIds = coAuthorsEntities.map((coAuthor) => new mongoose.Types.ObjectId( coAuthor._id.toString() ));
        const existingCoAuthors = blog.coAuthors.map((coAuthor) => new mongoose.Types.ObjectId( coAuthor.toString() ));
        const distnictCoAuthors = new Set(existingCoAuthors);

        coAuthorsIds.forEach((coAuthorId) => distnictCoAuthors.add( coAuthorId ));
        blog.coAuthors = Array.from(distnictCoAuthors);
        return super.Update(id, blog)
    }

    IncrementViews(id: mongoose.Types.ObjectId): Promise<BlogEntity> {
      return super._schema.findByIdAndUpdate( id , {$inc: {views: 1}});
    }

    GetBlogComments(id: mongoose.Types.ObjectId): Promise<CommentEntity[]> {
      return this._commentSchema.find({blog: id}).populate("user", "fullName email _id");
    }
}