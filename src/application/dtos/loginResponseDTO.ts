import mongoose from "mongoose";

export class LoginResponseDTO {
    constructor(
        public id: mongoose.Types.ObjectId,
        public token: string,
        public fullName: string,
        public email: string,
    ) {}
}