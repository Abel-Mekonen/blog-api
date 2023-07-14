import { Router } from "express";
import { Blog } from "@entities/BlogEntity";
import { BlogRepository } from "@repositories/BlogRepository";
import { BlogController } from "webapi/controllers/blog.controller";
import { protectRoute } from "webapi/middlewares/auth.handler.middleware";
import { Comment } from "@entities/CommentEntity";
import { LikeRepository } from "@repositories/LikeRepository";
import { Like } from "@entities/LikeEntity";
import { User } from "@entities/UserEntity";

const blogRoute = Router();
const blogRepository = new BlogRepository(Blog, Comment, User);
const likeRepository = new LikeRepository(Like, Blog);

const blogController = new BlogController(blogRepository, likeRepository);
blogRoute.get("/", blogController.getAll);
blogRoute.get("/:id", blogController.getById);
blogRoute.get("/:id/comments", blogController.getBlogComments);
blogRoute.post("/", protectRoute,  blogController.create);
blogRoute.post("/:id/like", protectRoute, blogController.likeBlog);
blogRoute.post("/:id/coAuthors", blogController.addCoAuthors);
blogRoute.put("/:id", protectRoute, blogController.update);

export { blogRoute };