import { model, Schema, Document } from 'mongoose';

const ratingRange = {
    values: [null, '1', '2', '3', '4', '5'],
    message: '{VALUE} no es una valoración valida'
}

const CommentSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
		ref: 'User',
        required: true,
    },
    post: {
		type: Schema.Types.ObjectId,
		ref: 'Post',
		required: true
    },
	description: {
		type: String,
		required: [true, 'El contenido del comentario es necesario'],
	},
	rating: {
		type: String,
		default: null,
		enum: ratingRange,
	}
},{
    versionKey:false,
    timestamps: true
})

export interface IComment extends Document {
    user: String;
    post: String;
    description: String;
    rating: string;
	createdAt: Date;
}

export default model<IComment>('Comment', CommentSchema);