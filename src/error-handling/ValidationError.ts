// validation error class for each property from class-validator
// map each error messsage to a string

import { HttpStatusCode } from "@helpers/Constants";
import { CustomError } from "./CustomError";
import { ValidationError } from "class-validator";

export class CustomValidationError extends CustomError {

    constructor(message: string) {
        super(message, HttpStatusCode.BAD_REQUEST, undefined);
    }

    public static Instance(errors: ValidationError[]): CustomValidationError { 
        const message = errors.map((error) => {
          return JSON.stringify(  Object.values(error.constraints)  );
            });      
        return new CustomValidationError(message.join(", "));
    }

}
