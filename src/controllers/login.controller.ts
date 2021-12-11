import { RequestHandler } from 'express';
import User, { IUser} from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config/config';

const singIn: RequestHandler = async ( req, res ) => {

    const body = req.body;

    if ( !body.email || !body.password ){
        return res.status(400).json({
            msg: 'Ingrese un email o contraseña valida'
        })
    }
    const userDB = await User.findOne({email: body.email});
        
    if(!userDB){
        return res.status(400).json({
            ok:false,
            err: {
                message: 'Usuario* o contraseña incorrecta'
            }
        })
    }

    let est = await userDB.comparePassword(body.password);

    if(!est){
        return res.status(400).json({
            ok:false,
            err: {
                message: 'Usuario o contraseña* incorrecta'
            }
        })
    }

    res.json({
        ok:true,
        usuario: userDB,
        token: createToken(userDB)
    })
    
}

function createToken(user: IUser) {
    return jwt.sign(
        { id: user._id},
        config.jsonwebtoken,
        { expiresIn: config.token_time }
    );
}



export {
    singIn
}
