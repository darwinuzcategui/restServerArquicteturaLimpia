import { UserEntity } from "../entities/user.entity";
import { LoginUserDto, RegisterUserDto } from "..";


export abstract class AuthRepository {

    // todo:
    abstract login (loginUserDto: LoginUserDto):Promise<UserEntity>

    //abstract register (name: string,email:string, password: string):Promise<UserEntity>
    abstract register (registerUserDto: RegisterUserDto):Promise<UserEntity>
}
