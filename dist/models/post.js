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
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.default = mongoose_1.model('Post', postSchema);
