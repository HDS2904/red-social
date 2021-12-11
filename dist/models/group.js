"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const groupSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'El nombre del grupo es necesario']
    },
    user: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
}, {
    versionKey: false,
    timestamps: true
});
groupSchema.methods.toJSON = function () {
    const group = this;
    const groupObject = group.toObject();
    delete groupObject.user;
    return groupObject;
};
exports.default = mongoose_1.model('Group', groupSchema);
