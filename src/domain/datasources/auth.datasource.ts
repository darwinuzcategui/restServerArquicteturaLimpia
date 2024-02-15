import { LoginUserDto, RegisterUserDto } from "..";
import { UserEntity } from "../entities/user.entity";


export abstract class AuthDatasource {

    // clazes login datasource login
    abstract login (loginUserDto: LoginUserDto):Promise<UserEntity>

    //abstract register (name: string,email:string, password: string):Promise<UserEntity>
    abstract register (registerUserDto: RegisterUserDto):Promise<UserEntity>
}
