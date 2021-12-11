"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cicloSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del ciclo es necesario']
    },
    description: {
        type: String,
        required: false
    }
});
exports.default = mongoose_1.model('Ciclo', cicloSchema);
