import { model, Schema, Document } from 'mongoose';

const CommentSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'El nombre del usuario es necesario']
    },
	email: {
        type: String,
        required: [true, 'El correo es necesario'],
        lowercase: true,    //minuscula
        trim: true  //caso de otro correo con espacios
    },
	image: {
        type: String,
		default: null
    },
    content: {
        type: String,
        required: [true, 'El contenido del comentario es necesario'],
    },
    postId: {
        type: String,
        required: true,
    },
},{
    versionKey:false,
    timestamps: true
})

export interface IComment extends Document {
    name: String;
    email: string;
	image: string,
    content: String;
    postId: String;
	createAt: Date;
}

export default model<IComment>('Comment', CommentSchema);