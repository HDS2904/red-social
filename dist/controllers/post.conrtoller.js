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
exports.deletePost = exports.putPost = exports.postPost = exports.getPostByIdUser = exports.getPostById = exports.getPost = void 0;
const post_1 = __importDefault(require("../models/post"));
const underscore_1 = __importDefault(require("underscore"));
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde || 0);
    const limite = Number(req.query.limite || 10);
    try {
        const postDB = yield post_1.default.find({}, 'title content image user updatedAt createdAt')
            .skip(desde)
            .limit(limite)
            .populate('user', 'username image')
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
                message: 'Ocurrio un error al obtener los posts'
            });
        }
        res.status(201).json({
            ok: true,
            post: postDB,
            nDatos: postN
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            message: error
        });
    }
});
exports.getPost = getPost;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const postDB = yield post_1.default.findById(id)
            .populate('user', 'username image')
            .exec();
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
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            message: error
        });
    }
});
exports.getPostById = getPostById;
const getPostByIdUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const postDB = yield post_1.default.find({ authorId: id })
            .populate('user', 'username image')
            .exec();
        if (!postDB) {
            return res.status(400).json({
                ok: false,
                message: 'Ocurrio un error al obtener los post del usuario'
            });
        }
        res.status(201).json({
            ok: true,
            post: postDB,
            nDatos: postDB === null || postDB === void 0 ? void 0 : postDB.length
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            message: error
        });
    }
});
exports.getPostByIdUser = getPostByIdUser;
const postPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const id = req.id;
    const post = new post_1.default({
        title: body.title,
        content: body.content,
        image: body.image,
        user: id,
    });
    try {
        const postDB = yield post.save();
        if (!postDB) {
            return res.status(400).json({
                ok: false,
                message: 'Ocurrio un error al guardar el post'
            });
        }
        res.status(201).json({
            ok: true,
            post: postDB
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            message: error
        });
    }
});
exports.postPost = postPost;
const putPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const body = underscore_1.default.pick(req.body, ['title', 'content', 'image']);
    try {
        const postDB = yield post_1.default.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!postDB) {
            return res.status(400).json({
                ok: false,
                message: 'Ocurrio un error al editar el post'
            });
        }
        res.status(201).json({
            ok: true,
            post: postDB
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            message: error
        });
    }
});
exports.putPost = putPost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const postDB = yield post_1.default.findByIdAndRemove(id);
        if (!postDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El post no existe'
                }
            });
        }
        res.json({
            ok: true,
            usuario: postDB
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            message: error
        });
    }
});
exports.deletePost = deletePost;
