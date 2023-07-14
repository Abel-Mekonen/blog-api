import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDTO {
    constructor(props: LoginDTO) {
        Object.assign(this, props);
    }

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
    
}