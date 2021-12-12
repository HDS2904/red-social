"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del usuario es necesario']
    },
    email: {
        type: String,
        required: [true, 'El correo es necesario'],
        lowercase: true,
        trim: true //caso de otro correo con espacios
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
}, {
    versionKey: false,
    timestamps: true
});
exports.default = mongoose_1.model('Comment', CommentSchema);
