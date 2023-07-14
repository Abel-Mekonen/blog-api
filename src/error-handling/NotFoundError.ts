import { CustomError } from "@error-custom/CustomError";
import { HttpStatusCode } from "@helpers/Constants";

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, HttpStatusCode.BAD_REQUEST, undefined);
  }
  name: string = "NotFoundError";
}
