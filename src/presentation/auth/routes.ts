import { Router } from "express";
import { AuthController } from "./controllers";
import { AuthDatasourceImple, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middleware/auth.middleware";


export class AuthRoutes {

    static get routes(): Router {

        const router = Router();

        const datasource = new AuthDatasourceImple()
        const authRepository = new AuthRepositoryImpl(datasource);

        const controller = new AuthController(authRepository);

        // definir todas mis rutas authenticated


        router.post('/login',controller.loginUser)

        router.post('/register',controller.registerUser)

        router.get('/',AuthMiddleware.validateJWT,controller.getUsers)

        /*
        router.post('/register',(req, res)=>{
            res.json('Register');

        });
        */


        return router;

        
    }
}