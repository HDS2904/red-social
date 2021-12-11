"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TemaSchema = new mongoose_1.Schema({
    title: {
        type: String,
        unique: true,
        required: [true, 'El nombre del Tema es necesario']
    },
    curse: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});
exports.default = mongoose_1.model('Tema', TemaSchema);
