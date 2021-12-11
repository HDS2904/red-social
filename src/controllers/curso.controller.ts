import { Request, Response } from 'express';
import Course, { ICourse } from '../models/course';

const getCourse = async ( req: Request, res: Response ) => {

    let desde = req.query.desde || 0
    desde = Number(desde)

    let limite = req.query.limite || 5
    limite = Number(limite)
    
    Course.find({ }, 'name description')
    .skip(desde)
    .limit(limite)
    .exec( ( err, cursos ) =>{

        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }

        Course.countDocuments(( err, cont ) => {
            res.status(201).json({
                ok:true,
                cursos,
                nDatos: cont
            })
        })

    })

}

const postCourse = async ( req: Request, res: Response ) => {

    const body = req.body;

    const curso: ICourse = new Course(body);

    await curso.save( ( err, cursoDB ) => {
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        if(!cursoDB){
            return res.status(400).json({
                ok:false,
                err
            })
        }

        if(cursoDB){
            return res.status(400).json({
                ok: true,
                curso: cursoDB
            })
        }
    });

}

const putCourse = async ( req: Request, res: Response ) => {

    const id = req.params.id;


    Course.findByIdAndUpdate( id, { new: true, runValidators: true }, (err, cursoDB) => {

        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: cursoDB
        })

    } )
}

export {
    getCourse,
    postCourse,
    putCourse
}