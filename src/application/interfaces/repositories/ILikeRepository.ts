import { LikeEntity } from "@entities/LikeEntity";
import { IGenericRepository } from "./IGenericRepository";
import { LikeDTO } from "@dtos/likeDTO";


export interface ILikeRepository extends IGenericRepository<LikeEntity>{
    LikeBlog(likeDto: LikeDTO): Promise<LikeEntity>;
}