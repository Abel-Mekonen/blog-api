import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "@error-custom//NotFoundError";
import { IUserRepository } from "@interfaces/repositories/IUserRepository";
import { JSendResponse } from "@error-custom/JsendResponse";
import  { Schema, Types } from "mongoose";
import { SignUpDTO } from "@dtos/signupDTO";
import  { User } from "@entities/UserEntity";
import { validate } from "class-validator";
import { LoginDTO } from "@dtos/loginDTO";
import { HttpStatusCode } from "@helpers/Constants";
import { asyncHandler } from "webapi/middlewares/async.handler.middleware";
import { type } from "os";
import { CustomValidationError } from "@error-custom/ValidationError";

export class AuthController {
  constructor(private _userRepository: IUserRepository) {}



  signup = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userDto = new SignUpDTO( req.body );
      const ValidationError = await validate(userDto);
      if (ValidationError.length > 0) {
        throw CustomValidationError.Instance(ValidationError)
      }
      const userCreated = await this._userRepository.Create( new User(userDto));
      res.status(HttpStatusCode.CREATED).json(new JSendResponse().success(userCreated));
    })

  login = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const loginDto = new LoginDTO( req.body );
      const ValidationError = await validate(loginDto);
      if (ValidationError.length > 0) {
        throw CustomValidationError.Instance(ValidationError)
      }
      const user = await this._userRepository.Login( loginDto );
      res.status(HttpStatusCode.OK).json(new JSendResponse().success(user));
    }
  )

  update = async (req: Request, res: Response, next: NextFunction) => {
    throw new Error("Method not implemented.");
  };
}
