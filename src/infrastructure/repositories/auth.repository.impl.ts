import { AuthDatasource, AuthRepository, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";


export class AuthRepositoryImpl implements AuthRepository {

    constructor(
        private readonly authdatasource: AuthDatasource,
        ) {}
        login(loginUserDto: LoginUserDto): Promise<UserEntity> {
            return this.authdatasource.login(loginUserDto);
        }
        register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
            return this.authdatasource.register(registerUserDto);
        }
        
}