"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ciclos = {
    values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    message: '{VALUE} no es un ciclo valido'
};
const CourseSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'El nombre del Curse es necesario']
    },
    ciclo: {
        type: Number,
        required: true,
        default: 0,
        enum: ciclos
    },
    group: {
        type: String,
        required: true,
        default: 0
    },
    description: {
        type: String,
        required: false
    }
});
exports.default = mongoose_1.model('Course', CourseSchema);
