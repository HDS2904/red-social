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
    authorId: {
        type: String,
		required: true
    }
},{
    versionKey:false,
    timestamps: true
})

postSchema.methods.toJSON = function () {
    const post = this;
    const postObject = post.toObject();
    delete postObject.user
    return postObject;
}

export interface IPost extends Document {
    title: String;
    content: String;
    image: String;
    authorId: String;
	createAt: Date;
	updateAt: Date;
}

export default model<IPost>('Post', postSchema);