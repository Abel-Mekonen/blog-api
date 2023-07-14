import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "@error-custom//NotFoundError";
import { BadRequestError } from "@error-custom//BadRequestError";
import { JSendResponse } from "@error-custom/JsendResponse";


export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err }
  error.message = err.message

  // mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`
    error = new NotFoundError(message)
  }

  // mongoose duplicate key when creating a new item
  if (err.code === 11000) {
    const message = 'Duplicate field value entered'
    error = new BadRequestError(message)
  }

  // mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val: any) => val.message)
    error = new BadRequestError(String(message))
  }

  res.status(error.statusCode || 500).json(new JSendResponse().error(error.message, error.stack))
}


