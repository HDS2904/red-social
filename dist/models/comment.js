"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ratingRange = {
    values: [null, '1', '2', '3', '4', '5'],
    message: '{VALUE} no es una valoración valida'
};
const CommentSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    post: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    versionKey: false,
    timestamps: true
});
exports.default = mongoose_1.model('Comment', CommentSchema);
