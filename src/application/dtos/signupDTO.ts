import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class SignUpDTO {
  constructor(props: SignUpDTO
    ) {
      Object.assign(this, props);
    }
    
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    // @IsStrongPassword()
    password: string

    @IsNotEmpty()
    @IsString()
    fullName: string
}