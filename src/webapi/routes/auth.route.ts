import { Router } from "express";
import { AuthController } from "webapi/controllers/auth.controller";
import { User } from "@entities/UserEntity";
import { UserRepository } from "@repositories/UserRepository";

const userRoute = Router();
const userRepository = new UserRepository(User);

const authController = new AuthController(userRepository);
userRoute.post("/signup", authController.signup);
userRoute.post("/login", authController.login);

export { userRoute };