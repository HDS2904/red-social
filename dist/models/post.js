"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
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
}, {
    versionKey: false,
    timestamps: true
});
postSchema.methods.toJSON = function () {
    const post = this;
    const postObject = post.toObject();
    delete postObject.user;
    return postObject;
};
exports.default = mongoose_1.model('Post', postSchema);
