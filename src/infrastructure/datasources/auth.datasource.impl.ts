import { BcryAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password:string) => string;
type CompareFunction = (password:string, hashed:string) => boolean;



export class AuthDatasourceImple implements AuthDatasource {

    constructor(
        private readonly hashPassword: HashFunction = BcryAdapter.hash, 
        private readonly comparePassword: CompareFunction = BcryAdapter.compare,
        )  {}
    
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        
        const {name, email, password} = registerUserDto;
       try {
        // 1.verificare si el correo existente
        /*  ejemplo
         if ('darwin@gmail.com' === email) {
        throw CustomError.forbidden('Correo existente')
       }
        */
       const emailExists = await UserModel.findOne({ email: email});
       if (emailExists) throw CustomError.badRequest('Correo existente');
      
        
        // 2.Hash de la contraseña

        
        const usuario = await UserModel.create({
            name: name,
            email: email,
            password: this.hashPassword( password ),
            //password: BcryAdapter.hash( password ),

        });
        await usuario.save();

        // 3. Mapear la respuesta a nuestra entidad
        // Todo: falta un mappers
     /*        return new UserEntity(
            usuario.id,
            name,
            email,
            usuario.password,       
            usuario.roles,
            );
            */
           return UserMapper.userEntityFromObject(usuario); 
           
        
        
       } catch (error) {
        if(error instanceof CustomError){
            throw error;
         }
         throw CustomError.internalServer();
        
       }
    }


    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const {email, password} = loginUserDto;

       try {
       
       const user = await UserModel.findOne({ email});

       if (!user) throw CustomError.badRequest('credenciales no correcta -Correo existente');
      
        const isMatching = this.comparePassword(password, user.password);

        if (! isMatching) throw CustomError.badRequest('credenciales no correcta -password is not valid'); 
           
        
        return UserMapper.userEntityFromObject(user); 
        
       } catch (error) {
        if(error instanceof CustomError){
            throw error;
         }
         throw CustomError.internalServer();
        
       }
    }



};