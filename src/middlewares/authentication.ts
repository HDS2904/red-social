
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import User from '../models/user';

declare global {
    namespace Express {
        interface Request {
            id: String
        }
    }
}

interface TokenDecoded {
    id: string,
    iat: number,
    exp: number
}

let vToken = ( req: Request, res: Response, next: NextFunction ) => {
	
    const token = req.header('token');

    if (!token){
        res.status(401).json({
            ok: false,
            err: {
                message: 'Token no existe'
            }
        })
    }else {
        try {
            const infDecoded = jwt.verify( token, config.jsonwebtoken ) as TokenDecoded;
            req.id = infDecoded.id;
            next();
            
        } catch (error) {
			return res.status(401).json({
				ok: false,
				err: {
					message: 'Acceso denegado'
				}
			})
        }
    }
}

const verificaAdmRol = async ( req: Request, res: Response, next: NextFunction ) => {

    await User.findOne({_id: req.id }, (err, usuarioDB) => {
        
		if( usuarioDB?.isStaff === 'ADMIN_ROLE'){
			next()
		}else {
			return res.json({
				ok:false,
				err: {
					message: 'Usted no es el ADMINISTRADOR'
				}
			})
		}
    });

}

export {
    vToken,
    verificaAdmRol
}