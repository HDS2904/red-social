import { RequestHandler } from 'express';
import Post, { IPost } from '../models/post';
import _ from 'underscore';

const getPost: RequestHandler = async ( req, res ) => {
    const desde = Number(req.query.desde || 0);
    const limite = Number(req.query.limite || 10);
	try {
		const postDB = await Post.find({ }, 'title content image user updatedAt createdAt')
			.skip(desde)
			.limit(limite)
			.populate('user','username image')
			.exec();
		if ( !postDB ) {
			return res.status(400).json({
				ok:false,
				message: 'Ocurrio un error al obtener los datos'
			});
		}
		const postN = await Post.countDocuments();
		if ( !postN && postN!==0 ) {
			return res.status(400).json({
				ok:false,
				message: 'Ocurrio un error al obtener los posts'
			});
		}
		res.status(201).json({
			ok:true,
			post: postDB,
			nDatos: postN
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			message: error
		});
	}
}

const getPostById: RequestHandler = async ( req, res ) => {
	const id = req.params.id;
	try {
		const postDB = await Post.findById( id )
			.populate('user','username image')
			.exec();
		if ( !postDB ) {
			return res.status(400).json({
				ok:false,
				message: 'Ocurrio un error al obtener los datos del post'
			});
		}
		res.status(201).json({
			ok:true,
			post: postDB
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			message: error
		});
	}
}

const getPostByIdUser: RequestHandler = async ( req, res ) => {
	const id = req.params.id;
	try {
		const postDB = await Post.find( {authorId: id})
			.populate('user','username image')
			.exec();
		if ( !postDB ) {
			return res.status(400).json({
				ok:false,
				message: 'Ocurrio un error al obtener los post del usuario'
			});
		}
		res.status(201).json({
			ok:true,
			post: postDB,
			nDatos: postDB?.length
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			message: error
		});
	}
}

const postPost: RequestHandler = async ( req, res ) => {
    const body = req.body;
    const id = req.id;
    const post: IPost = new Post({
        title: body.title,
        content: body.content,
        image: body.image,
        user: id,
	});
	try {
		const postDB = await post.save();
		if ( !postDB ) {
			return res.status(400).json({
				ok:false,
				message: 'Ocurrio un error al guardar el post'
			});
		}
		res.status(201).json({
			ok:true,
			post: postDB
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			message: error
		});
	}
}

const putPost: RequestHandler = async ( req , res ) => {
    const id = req.params.id;
	const body = _.pick( req.body, ['title', 'content', 'image'] );
	try {
		const postDB = await Post.findByIdAndUpdate( id, body, { new: true, runValidators: true });
		if ( !postDB ) {
			return res.status(400).json({
				ok:false,
				message: 'Ocurrio un error al editar el post'
			});
		}
		res.status(201).json({
			ok:true,
			post: postDB
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			message: error
		});
	}
}

const deletePost: RequestHandler = async ( req, res ) => {
    const id = req.params.id;
	try {
		const postDB = await Post.findByIdAndRemove( id );
		if(!postDB){
			return res.status(400).json({
				ok:false,
				err: {
					message: 'El post no existe'
				}
			});
		}
		res.json({
			ok:true,
			usuario: postDB
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			message: error
		});
	}
}

export {
	getPost,
	getPostById,
	getPostByIdUser,
    postPost,
    putPost,
    deletePost
}
