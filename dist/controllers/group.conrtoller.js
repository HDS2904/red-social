"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGroup = exports.putGroup = exports.getGroup = exports.postGroup = void 0;
const group_1 = __importDefault(require("../models/group"));
const postGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let body = req.body;
    let id = req.id;
    let group = new group_1.default({
        name: body.name,
        user: id,
        description: body.description
    });
    const groupDB = yield group.save();
    if (!groupDB) {
        return res.status(400).json({
            ok: false,
            message: 'Ocurrio un error al obtener los datos'
        });
    }
    res.status(201).json({
        ok: true,
        group: groupDB
    });
});
exports.postGroup = postGroup;
const getGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    const groupDB = yield group_1.default.find({}, 'name description createdAt updatedAt')
        .skip(desde)
        .limit(limite)
        .exec();
    if (!groupDB) {
        return res.status(400).json({
            ok: false,
            message: 'Ocurrio un error al obtener los datos'
        });
    }
    const groupN = yield group_1.default.countDocuments();
    if (!groupN) {
        return res.status(400).json({
            ok: false,
            message: 'Ocurrio un error al obtener los datos'
        });
    }
    res.status(201).json({
        ok: true,
        group: groupDB,
        nDatos: groupN
    });
});
exports.getGroup = getGroup;
const putGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    const groupDB = yield group_1.default.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!groupDB) {
        return res.status(400).json({
            ok: false,
            message: 'Ocurrio un error al editar el grupo'
        });
    }
    res.status(201).json({
        ok: true,
        group: groupDB
    });
});
exports.putGroup = putGroup;
const deleteGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    const groupDB = yield group_1.default.findByIdAndRemove(id);
    if (!groupDB) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'El grupo no existe'
            }
        });
    }
    res.json({
        ok: true,
        usuario: groupDB
    });
});
exports.deleteGroup = deleteGroup;
