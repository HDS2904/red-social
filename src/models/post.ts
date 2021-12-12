import { model, Schema, Document } from 'mongoose';

const postSchema = new Schema ({
    title: {
        type: String,
        unique: true,
        required: [true, 'El título del post es necesario']
    },
    content: {
        type: String,
		default: null
    },
	image: {
        type: String,
		default: null
    },
    user: {
        type: Schema.Types.ObjectId,
		ref: 'User',
        required: true,
    }
},{
    versionKey:false,
    timestamps: true
})

export interface IPost extends Document {
    title: String;
    content: String;
    image: String;
    user: String;
	createdAt: Date;
	updateAt: Date;
}

export default model<IPost>('Post', postSchema);