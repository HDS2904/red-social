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
exports.deleteComment = exports.putComment = exports.postComment = exports.getCommentByIdPost = exports.getCommentById = exports.getComment = void 0;
const comment_1 = __importDefault(require("../models/comment"));
const underscore_1 = __importDefault(require("underscore"));
const getComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde || 0);
    const limite = Number(req.query.limite || 10);
    try {
        const commentDB = yield comment_1.default.find({}, 'user post description rating createAt')
            .skip(desde)
            .limit(limite)
            .populate('user', 'username email image')
            .populate('post', 'title')
            .exec();
        if (!commentDB) {
            return res.status(400).json({
                ok: false,
                message: 'Ocurrio un error al obtener los comentarios'
            });
        }
        const commentN = yield comment_1.default.countDocuments();
        if (!commentN && commentN !== 0) {
            return res.status(400).json({
                ok: false,
                message: 'Ocurrio un error al obtener los comentarios'
            });
        }
        res.status(201).json({
            ok: true,
            comment: commentDB,
            nDatos: commentN
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            message: error
        });
    }
});
exports.getComment = getComment;
const getCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const commentDB = yield comment_1.default.findById(id)
            .populate('user', 'username email image')
            .populate('post', 'title')
            .exec();
        if (!commentDB) {
            return res.status(400).json({
                ok: false,
                message: 'Ocurrio un error al obtener los datos de comentario'
            });
        }
        res.status(201).json({
            ok: true,
            comment: commentDB
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            message: error
        });
    }
});
exports.getCommentById = getCommentById;
const getCommentByIdPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const commentDB = yield comment_1.default.find({ post: id })
            .populate('user', 'username email image')
            .populate('post', 'title')
            .exec();
        if (!commentDB) {
            return res.status(400).json({
                ok: false,
                message: 'Ocurrio un error al obtener los comentarios del post'
            });
        }
        res.status(201).json({
            ok: true,
            comment: commentDB
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            message: error
        });
    }
});
exports.getCommentByIdPost = getCommentByIdPost;
const postComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const id = req.id;
    const comment = new comment_1.default({
        user: id,
        post: body.post,
        description: body.description,
        rating: body.rating
    });
    try {
        const comment = new comment_1.default({
            user: id,
            post: body.post,
            description: body.description,
            rating: body.rating
        });
        const commentDB = yield comment.save();
        if (!commentDB) {
            return res.status(400).json({
                ok: false,
                message: 'Ocurrio un error al guardar el comentario'
            });
        }
        res.status(201).json({
            ok: true,
            comment: commentDB
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            message: error
        });
    }
});
exports.postComment = postComment;
const putComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const body = underscore_1.default.pick(req.body, ['description, rating']);
    try {
        const commentDB = yield comment_1.default.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!commentDB) {
            return res.status(400).json({
                ok: false,
                message: 'Ocurrio un error al editar el comentario'
            });
        }
        res.status(201).json({
            ok: true,
            comment: commentDB
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            message: error
        });
    }
});
exports.putComment = putComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const commentDB = yield comment_1.default.findByIdAndRemove(id);
        if (!commentDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El comentario no existe'
                }
            });
        }
        res.json({
            ok: true,
            usuario: commentDB
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            message: error
        });
    }
});
exports.deleteComment = deleteComment;
