import { LoginDTO } from "@dtos/loginDTO";
import { LoginResponseDTO } from "@dtos/loginResponseDTO";
import { UserEntity } from "@entities/UserEntity";
import { IGenericRepository } from "@interfaces/repositories/IGenericRepository";

export interface IUserRepository extends IGenericRepository<UserEntity> {
    Login(loginDTO: LoginDTO): Promise<LoginResponseDTO>;
}
