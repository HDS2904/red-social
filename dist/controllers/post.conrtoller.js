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
exports.deletePost = exports.putPost = exports.postPost = exports.getPostById = exports.getPost = void 0;
const post_1 = __importDefault(require("../models/post"));
const underscore_1 = __importDefault(require("underscore"));
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde || 0);
    const limite = Number(req.query.limite || 5);
    const postDB = yield post_1.default.find({}, 'title content image authorId updatedAt createAt')
        .skip(desde)
        .limit(limite)
        .exec();
    if (!postDB) {
        return res.status(400).json({
            ok: false,
            message: 'Ocurrio un error al obtener los datos'
        });
    }
    const postN = yield post_1.default.countDocuments();
    if (!postN && postN !== 0) {
        return res.status(400).json({
            ok: false,
            message: 'Ocurrio un error al obtener los datos'
        });
    }
    res.status(201).json({
        ok: true,
        post: postDB,
        nDatos: postN
    });
});
exports.getPost = getPost;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const postDB = yield post_1.default.findById(id);
    if (!postDB) {
        return res.status(400).json({
            ok: false,
            message: 'Ocurrio un error al obtener los datos del post'
        });
    }
    res.status(201).json({
        ok: true,
        post: postDB
    });
});
exports.getPostById = getPostById;
const postPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const id = req.id;
    let post = new post_1.default({
        title: body.title,
        content: body.content,
        image: body.image,
        authorId: id,
    });
    const postDB = yield post.save();
    if (!postDB) {
        return res.status(400).json({
            ok: false,
            message: 'Ocurrio un error al obtener los datos'
        });
    }
    res.status(201).json({
        ok: true,
        post: postDB
    });
});
exports.postPost = postPost;
const putPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const body = underscore_1.default.pick(req.body, ['title', 'content', 'image']);
    const postDB = yield post_1.default.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!postDB) {
        return res.status(400).json({
            ok: false,
            message: 'Ocurrio un error al editar el grupo'
        });
    }
    res.status(201).json({
        ok: true,
        post: postDB
    });
});
exports.putPost = putPost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const postDB = yield post_1.default.findByIdAndRemove(id);
    if (!postDB) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'El grupo no existe'
            }
        });
    }
    res.json({
        ok: true,
        usuario: postDB
    });
});
exports.deletePost = deletePost;
