import { NextFunction,Request,Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";



 export class AuthMiddleware {

    static validateJWT =async (req: Request, res: Response,next: NextFunction) => {
        console.log('paso por middleware');
        const authorization = req.header('Authorization');
        if( !authorization) return res.status(401).json({ error: 'no Token presente'});
        if( !authorization.startsWith('Bearer')) return res.status(401).json({ error: 'Invalid Bearer Token'});
        const token = authorization.split(' ').at(1) ||  '';

        try {

            //todo:
            const payload = await JwtAdapter.validateToken<{id:string}>(token); 
            if (!payload) return res.status(401).json({ error: 'Ivalid Token por Payload'});

            const user = await UserModel.findById(payload.id);
            if (!user) return res.status(401).json({ error: 'Ivalid token -user not found' }); 

              
                        
            req.body.user = user;
            
            next();

            
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error'});
            
        }

        

    }
 }