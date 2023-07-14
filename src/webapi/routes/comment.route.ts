import { Router } from "express";
import { Comment } from "@entities/CommentEntity";
import { CommentRepository } from "@repositories/CommentRepository";
import { protectRoute } from "webapi/middlewares/auth.handler.middleware";
import { CommentController } from "webapi/controllers/comment.controller";

const commentRoute = Router();
const commentRepository = new CommentRepository(Comment);

const commentController = new CommentController(commentRepository);
commentRoute.get("/", commentController.getAll);
commentRoute.get("/:id", commentController.getById);
commentRoute.post("/", protectRoute,  commentController.create);
commentRoute.put("/:id", commentController.update);

export { commentRoute };