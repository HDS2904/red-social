import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import _ from 'underscore';

const getUser = async ( req: Request, res: Response ) => {
    const desde = Number(req.query.desde || 0);
    const limite = Number(req.query.limite || 10);
	try {
		const userDB = await User.find({ isActive: true }, 'username firstName lastName image email isStaff isActive updateAt')
			.skip(desde)
			.limit(limite)
			.exec()
		if ( !userDB ) {
			return res.status(400).json({
				ok:false,
				message: 'Ocurrio un error al obtener los datos de los usuarios'
			});
		}
		const userN = await User.countDocuments();
		if ( !userN && userN!==0 ) {
			return res.status(400).json({
				ok:false,
				message: 'Ocurrio un error al obtener los datos de los usuarios'
			});
		}
		res.status(201).json({
			ok:true,
			users: userDB,
			nDatos: userN
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			message: error
		});
	}
}

const getUserById = async ( req: Request, res: Response ) => {
	const id = req.params.id;
	try {
		const userDB = await User.findById( id );
		if ( !userDB ) {
			return res.status(400).json({
				ok:false,
				message: 'Ocurrio un error al obtener los datos del usuario'
			});
		}
		res.status(201).json({
			ok:true,
			user: userDB
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			message: error
		});
	}
}

const postUser = async ( req: Request, res: Response ) => {
    const body = req.body;
    const user: IUser = new User({
        username: body.username,
		firstName: body.firstName,
		lastName: body.lastName,
		image: body.image,
		email: body.email,
		password: body.password,
		isStaff: body.isStaff,
		isActive: body.isActive,
    });
	try {
		const userDB = await user.save();
		if ( !userDB ) {
			return res.status(400).json({
				ok:false,
				message: 'Ocurrio un error al guardar el usuario'
			});
		}
		res.status(201).json({
			ok:true,
			user: userDB
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			message: error
		});
	}
}

const putUser = async ( req: Request, res: Response ) => {
    const id = req.params.id;
    const body = _.pick( req.body, ['username', 'firstName', 'lastName', 'image', 'email', 'isActive'] );
	try {
		const userDB = await User.findByIdAndUpdate( id, body, { new: true, runValidators: true })
		if(!userDB){
			return res.status(400).json({
				ok:false,
				err: {
					message: 'El usuario no existe'
				}
			});
		}
		res.json({
			ok:true,
			usuario: userDB
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			message: error
		});
	}
}

const deleteUser = async ( req: Request, res: Response ) => {
    const id = req.params.id;
    const nuevoEstado = { isActive: false };
	try {
		const userDB = await User.findByIdAndUpdate( id, nuevoEstado, {new: true});
		if(!userDB){
			return res.status(400).json({
				ok:false,
				err: {
					message: 'El usuario no existe'
				}
			});
		}
		res.json({
			ok:true,
			user: userDB
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			message: error
		});
	}
}

export {
    getUser,
	getUserById,
    postUser,
    putUser,
    deleteUser
}