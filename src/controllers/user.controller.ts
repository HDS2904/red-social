import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import _ from 'underscore';

const getUser = async ( req: Request, res: Response ) => {
    const desde = Number(req.query.desde || 0)
    const limite = Number(req.query.limite || 5)

    const userDB = await User.find({ isActive: true }, 'username firstName lastName email isStaff isActive updateAt')
        .skip(desde)
        .limit(limite)
        .exec()

	if ( !userDB ) {
		return res.status(400).json({
			ok:false,
			message: 'Ocurrio un error al obtener los datos'
		});
	}

	const userN = await User.countDocuments();

	if ( !userN ) {
		return res.status(400).json({
			ok:false,
			message: 'Ocurrio un error al obtener los datos'
		});
	}

	res.status(201).json({
		ok:true,
		users: userDB,
		nDatos: userN
	})
}

const getUserById = async ( req: Request, res: Response ) => {
	const id = req.params.id
	const userDB = await User.findById( id );

    if ( !userDB ) {
        return res.status(400).json({
            ok:false,
            message: 'Ocurrio un error al obtener los datos'
        });
    }

    res.status(201).json({
        ok:true,
        user: userDB
    })

}

const postUser = async ( req: Request, res: Response ) => {
    const body = req.body

    const user: IUser = new User({
        username: body.username,
		firstName: body.firstName,
		lastName: body.lastName,
		email: body.email,
		password: body.password,
		isStaff: body.isStaff,
		isActive: body.isActive,
    })

    const userDB = await user.save()

	console.log("userDB")

	if ( !userDB ) {
        return res.status(400).json({
            ok:false,
            message: 'Ocurrio un error al obtener los datos'
        });
    }

    res.status(201).json({
        ok:true,
        user: userDB
    })
}

const putUser = async ( req: Request, res: Response ) => {
    const id = req.params.id
    const body = _.pick( req.body, ['username', 'firstName', 'lastName', 'email', 'isActive'] )

    const userDB = await User.findByIdAndUpdate( id, body, { new: true, runValidators: true })

	if(!userDB){
        return res.status(400).json({
            ok:false,
            err: {
                message: 'El usuario no existe'
            }
        })
    }

    res.json({
        ok:true,
        usuario: userDB
    })
}

const deleteUser = async ( req: Request, res: Response ) => {
    const id = req.params.id

    const nuevoEstado = { isActive: false }

    const userDB = await User.findByIdAndUpdate( id, nuevoEstado, {new: true})

	if(!userDB){
        return res.status(400).json({
            ok:false,
            err: {
                message: 'El usuario no existe'
            }
        })
    }

    res.json({
        ok:true,
        user: userDB
    })
}

//DELETE: permite borrar usuario/usuarios 
// const deleteUser = async ( req: Request, res: Response ) => {
    
//     let id = req.params.id

//     User.findByIdAndRemove( id, (err, usuarioBorrar) => {

//         if(err){
//             return res.status(400).json({
//                 ok:false,
//                 err
//             })
//         }

//         if(!usuarioBorrar){
//             return res.status(400).json({
//                 ok:false,
//                 err: {
//                     message: 'El usuario no existe'
//                 }
//             })
//         }

//         res.json({
//             ok:true,
//             usuario: usuarioBorrar
//         })

//     } )

// }

export {
    getUser,
	getUserById,
    postUser,
    putUser,
    deleteUser
}