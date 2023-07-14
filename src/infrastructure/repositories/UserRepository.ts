import { UserEntity } from "@entities/UserEntity";
import { GenericRepository } from "./GenericRepository";
import { IUserRepository } from "@interfaces/repositories/IUserRepository";
import mongoose from "mongoose";
import { CustomError } from "@error-custom/CustomError";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { LoginResponseDTO } from "@dtos/loginResponseDTO";
import { LoginDTO } from "@dtos/loginDTO";

export class UserRepository
  extends GenericRepository<UserEntity>
  implements IUserRepository
{
  constructor(schema: mongoose.Model<UserEntity>) {
    super(schema);  
  }

  async Login(loginDTO: LoginDTO): Promise<LoginResponseDTO> {
    const user = await this._schema.findOne({ email: loginDTO.email });
    console.log("loginDTO", loginDTO)
    if (!user) {
      throw new CustomError("Invalid credentials", 400, undefined);
    }
    
    const isMatch = await this.ComparePassword(loginDTO.password, user);
    console.log("isMatch", isMatch);

    if (!isMatch) {
      throw new CustomError("Invalid credentials", 400, undefined);
    }

    const token = await this.generateToken(user);
    const response = new LoginResponseDTO(user.id, token, user.fullName, user.email);
    return response;
  }

 
  async ComparePassword(password: string, user: any): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
  }

  async generateToken (user: any) {
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
  };

}