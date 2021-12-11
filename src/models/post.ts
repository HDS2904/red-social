import { model, Schema, Document } from 'mongoose';

const postSchema = new Schema ({
    title: {
        type: String,
        unique: true,
        required: [true, 'El título del post es necesario']
    },
    content: {
        type: String
    },
	image: {
        type: String
    },
    authorId: {
        type: String
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
}

export default model<IPost>('Post', postSchema);