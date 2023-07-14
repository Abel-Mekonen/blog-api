import { CommentEntity } from "@entities/CommentEntity";
import { IGenericRepository } from "@interfaces/repositories/IGenericRepository";

export interface ICommentRepository extends IGenericRepository<CommentEntity> {
}
