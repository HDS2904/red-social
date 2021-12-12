import { RequestHandler } from 'express';
import Comment, { IComment } from '../models/comment';
import _ from 'underscore';

const getComment: RequestHandler = async ( req, res ) => {
    const desde = Number(req.query.desde || 0);
    const limite = Number(req.query.limite || 10);
	try {
		const commentDB = await Comment.find({ }, 'user post description rating createAt')
			.skip(desde)
			.limit(limite)
			.populate('user', 'username email image')
			.populate('post', 'title')
			.exec();
		if ( !commentDB ) {
			return res.status(400).json({
				ok:false,
				message: 'Ocurrio un error al obtener los comentarios'
			});
		}
		const commentN = await Comment.countDocuments();
		if ( !commentN && commentN!==0 ) {
			return res.status(400).json({
				ok:false,
				message: 'Ocurrio un error al obtener los comentarios'
			});
		}
		res.status(201).json({
			ok:true,
			comment: commentDB,
			nDatos: commentN
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			message: error
		});
	}
}

const getCommentById: RequestHandler = async ( req, res ) => {
	const id = req.params.id;
	try {
		const commentDB = await Comment.findById( id )
			.populate('user', 'username email image')
			.populate('post', 'title')
			.exec();
		if ( !commentDB ) {
			return res.status(400).json({
				ok:false,
				message: 'Ocurrio un error al obtener los datos de comentario'
			});
		}
		res.status(201).json({
			ok:true,
			comment: commentDB
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			message: error
		});
	}
}

const getCommentByIdPost: RequestHandler = async ( req, res ) => {
	const id = req.params.id;
	try {
		const commentDB = await Comment.find( {post: id})
			.populate('user', 'username email image')
			.populate('post', 'title')	
			.exec();
		if ( !commentDB ) {
			return res.status(400).json({
				ok:false,
				message: 'Ocurrio un error al obtener los comentarios del post'
			});
		}
		res.status(201).json({
			ok:true,
			comment: commentDB
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			message: error
		});
	}
}

const postComment: RequestHandler = async ( req, res ) => {
    const body = req.body;
    const id = req.id;
	
    const comment: IComment = new Comment({
        user: id,
		post: body.post,
        description: body.description,
		rating: body.rating
	});

	try {
        const comment: IComment = new Comment({
			user: id,
			post: body.post,
			description: body.description,
			rating: body.rating
		});
		const commentDB = await comment.save();
		if ( !commentDB ) {
			return res.status(400).json({
				ok:false,
				message: 'Ocurrio un error al guardar el comentario'
			});
		}
		res.status(201).json({
			ok:true,
			comment: commentDB
		});
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: error
        });
    }
}

const putComment: RequestHandler = async ( req , res ) => {
    const id = req.params.id;
	const body = _.pick( req.body, ['description, rating'] );
	try {
		const commentDB = await Comment.findByIdAndUpdate( id, body, { new: true, runValidators: true });
		if ( !commentDB ) {
			return res.status(400).json({
				ok:false,
				message: 'Ocurrio un error al editar el comentario'
			});
		}
		res.status(201).json({
			ok:true,
			comment: commentDB
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			message: error
		});
	}
}

const deleteComment: RequestHandler = async ( req, res ) => {
    const id = req.params.id;
	try {
		const commentDB = await Comment.findByIdAndRemove( id );
		if(!commentDB){
			return res.status(400).json({
				ok:false,
				err: {
					message: 'El comentario no existe'
				}
			});
		}
		res.json({
			ok:true,
			usuario: commentDB
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			message: error
		});
	}
}

export {
	getComment,
	getCommentById,
	getCommentByIdPost,
    postComment,
    putComment,
    deleteComment
}
