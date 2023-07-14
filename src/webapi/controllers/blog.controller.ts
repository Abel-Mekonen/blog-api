import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "@error-custom//NotFoundError";
import { JSendResponse } from "@error-custom/JsendResponse";
import  { Schema, Types } from "mongoose";
import { Blog } from "@entities/BlogEntity";
import { IBlogRepository } from "@interfaces/repositories/IBlogRepository";
import { ILikeRepository } from "@interfaces/repositories/ILikeRepository";
import { LikeDTO } from "@dtos/likeDTO";
import { HttpStatusCode } from "@helpers/Constants";
import { CreateBlogDTO } from "@dtos/createBlogDTO";
import { validate } from "class-validator";
import { CustomValidationError } from "@error-custom/ValidationError";
import { asyncHandler } from "webapi/middlewares/async.handler.middleware";
import { BadRequestError } from "@error-custom/BadRequestError";


export class BlogController {
  constructor(private _blogRepository: IBlogRepository, private _likeRepository: ILikeRepository) {}

    getAll = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            let blogs = await this._blogRepository.GetAll();
            res.status(HttpStatusCode.OK).json(new JSendResponse().success(blogs));
        });


    getById = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const id = new Types.ObjectId(req.params.id);
            console.log(id)
            let blog = await this._blogRepository.IncrementViews( id );

            if (!blog) {
                throw new NotFoundError("Blog not found");
            }

            res.status(HttpStatusCode.OK).json(new JSendResponse().success(blog));
        });


    create = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const { title, content, user, coAuthors } = req.body;
            const createBlogDTO = new CreateBlogDTO(title, content, user, coAuthors.map((coAuthor: any) => new Types.ObjectId(coAuthor)))
            const ValidationError = await validate(createBlogDTO)

            if (ValidationError.length > 0) {
                throw  CustomValidationError.Instance(ValidationError)
            }

            const blogCreated = await this._blogRepository.Create( new Blog( { title, content, author: user, coAuthors } ));
            res.status(HttpStatusCode.CREATED).json(new JSendResponse().success(blogCreated));
        });


    getBlogComments =  asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const id = new Types.ObjectId(req.params.id);
            let blog = await this._blogRepository.GetBlogComments( id );

            if (!blog) {
                throw new NotFoundError("Blog not found");
            }

            res.status(HttpStatusCode.OK).json(new JSendResponse().success(blog));
        });

    
    likeBlog = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const likeDTO = new LikeDTO( req.body.user, new Types.ObjectId(req.params.id));
            const like = await this._likeRepository.LikeBlog(likeDTO);

            if(!like){
                res.status(HttpStatusCode.BAD_REQUEST).json(new JSendResponse().error("Blog already liked"));
            }

            res.status(HttpStatusCode.OK).json(new JSendResponse().success(like));
        });


    addCoAuthors = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const id = new Types.ObjectId(req.params.id);
            const coAuthors = req.body.coAuthors.map((coAuthor: any) => new Types.ObjectId(coAuthor));
            const blog = await this._blogRepository.AddCoAuthors(id, coAuthors);
            res.status(HttpStatusCode.OK).json(new JSendResponse().success(blog));
        });

    
    update = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const id = new Types.ObjectId(req.params.id);
            const { title, content, user } = req.body;

            const blog = await this._blogRepository.GetById(id);
            if(!blog) throw new NotFoundError("Blog not found");
            if(blog.author.toString() !== user && !blog.coAuthors.includes(user))
                throw new BadRequestError("User is not author or coauthor");
            
            blog.title = title;
            blog.content = content;
            const blogUpdated = await this._blogRepository.Update(id, blog);

            res.status(HttpStatusCode.OK).json(new JSendResponse().success(blogUpdated));
        });

    
}
