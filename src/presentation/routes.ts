import { Router } from "express";
import { AuthRoutes } from "./auth/routes";


export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        // definir todas mis rutas principals

        router.use('/api/auth',AuthRoutes.routes);
        //router.use('/api/user)
        //router.use('/api/auth')
        //router.use('/api/products')
        //router.use('/api/clientes')


        return router;

        
    }
}