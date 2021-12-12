import { RequestHandler } from 'express';
import Comment, { IComment } from '../models/comment';
import _ from 'underscore';
import User from '../models/user';

const getComment: RequestHandler = async ( req, res ) => {
    const desde = Number(req.query.desde || 0);
    const limite = Number(req.query.limite || 10);
    const commentDB = await Comment.find({ }, 'name email image content createAt')
        .skip(desde)
        .limit(limite)
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
}

const getCommentById: RequestHandler = async ( req, res ) => {
	const id = req.params.id;
	const commentDB = await Comment.findById( id );
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
}

const getCommentByIdPost: RequestHandler = async ( req, res ) => {
	const id = req.params.id;
	const commentDB = await Comment.find( {postId: id});
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
}

const postComment: RequestHandler = async ( req, res ) => {
    const body = req.body;
    const id = req.id;
	const userDB = await User.findById( id );
    const comment: IComment = new Comment({
        name: userDB?.username,
        email: userDB?.email,
        image: userDB?.image,
        content: body.content,
		postId: body.postId
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
}

const putComment: RequestHandler = async ( req , res ) => {
    const id = req.params.id;
	const body = _.pick( req.body, ['content'] );
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
}

const deleteComment: RequestHandler = async ( req, res ) => {
    const id = req.params.id;
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
}

export {
	getComment,
	getCommentById,
	getCommentByIdPost,
    postComment,
    putComment,
    deleteComment
}
