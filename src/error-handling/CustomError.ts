import { HttpStatusCode } from "@helpers/Constants";

export class CustomError extends Error {
  constructor(message: string, statusCode: number, stack: any) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    this.stack = stack;

  }
  statusCode: number;
}
