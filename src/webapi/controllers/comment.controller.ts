import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "@error-custom//NotFoundError";
import { JSendResponse } from "@error-custom/JsendResponse";
import  { Schema, Types } from "mongoose";
import { Comment } from "@entities/CommentEntity";
import { ICommentRepository } from "@interfaces/repositories/ICommentRepository";

export class CommentController {
  constructor(private _commentRepository: ICommentRepository) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    let comments = await this._commentRepository.GetAll();
    res.status(200).json(new JSendResponse().success(comments));
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    const id = new Types.ObjectId(req.params.id);
    let comment = await this._commentRepository.GetById( id );
    if (!comment) {
      throw new NotFoundError("Comment not found");
    }
    res.status(200).json(new JSendResponse().success(comment));
  };


  create = async (req: Request, res: Response, next: NextFunction) => {
    const { content, user, blog } = req.body;
    const commentCreated = await this._commentRepository.Create( new Comment( { content, user, blog } ));
    res.status(201).json(new JSendResponse().success(commentCreated));
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    throw new Error("Method not implemented.");
  };
}
