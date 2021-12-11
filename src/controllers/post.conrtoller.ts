import { RequestHandler } from 'express';
import Post, { IPost } from '../models/post';

const getPost: RequestHandler = async ( req, res ) => {
    const desde = Number(req.query.desde || 0)
    const limite = Number(req.query.limite || 5)

    const postDB = await Post.find({ }, 'title content image authorId updatedAt createAt')
        .skip(desde)
        .limit(limite)
        .exec();

    if ( !postDB ) {
        return res.status(400).json({
            ok:false,
            message: 'Ocurrio un error al obtener los datos'
        });
    }

    const postN = await Post.countDocuments();

    if ( !postN ) {
        return res.status(400).json({
            ok:false,
            message: 'Ocurrio un error al obtener los datos'
        });
    }

    res.status(201).json({
        ok:true,
        post: postDB,
        nDatos: postN
    })

}











const postPost: RequestHandler = async ( req, res ) => {

    let body = req.body
    let id = req.id

    let post: IPost = new Post({
        name: body.name,
        user: id,
        description: body.description
    });


    const postDB = await post.save();

    if ( !postDB ) {
        return res.status(400).json({
            ok:false,
            message: 'Ocurrio un error al obtener los datos'
        });
    }

    res.status(201).json({
        ok:true,
        post: postDB
    })

}

const putPost: RequestHandler = async ( req , res ) => {
    let id = req.params.id

    const postDB = await Post.findByIdAndUpdate( id, req.body, { new: true, runValidators: true });

    if ( !postDB ) {
        return res.status(400).json({
            ok:false,
            message: 'Ocurrio un error al editar el grupo'
        });
    }

    res.status(201).json({
        ok:true,
        post: postDB
    })
}

const deletePost: RequestHandler = async ( req, res ) => {
    
    let id = req.params.id

    const postDB = await Post.findByIdAndRemove( id );

    if(!postDB){
        return res.status(400).json({
            ok:false,
            err: {
                message: 'El grupo no existe'
            }
        })
    }

    res.json({
        ok:true,
        usuario: postDB
    })
}

export {
    postPost,
    getPost,
    putPost,
    deletePost
}
