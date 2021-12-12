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
const user_1 = __importDefault(require("../models/user"));
const getComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde || 0);
    const limite = Number(req.query.limite || 10);
    const commentDB = yield comment_1.default.find({}, 'name email image content createAt')
        .skip(desde)
        .limit(limite)
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
});
exports.getComment = getComment;
const getCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const commentDB = yield comment_1.default.findById(id);
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
});
exports.getCommentById = getCommentById;
const getCommentByIdPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const commentDB = yield comment_1.default.find({ postId: id });
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
});
exports.getCommentByIdPost = getCommentByIdPost;
const postComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const id = req.id;
    const userDB = yield user_1.default.findById(id);
    const comment = new comment_1.default({
        name: userDB === null || userDB === void 0 ? void 0 : userDB.username,
        email: userDB === null || userDB === void 0 ? void 0 : userDB.email,
        image: userDB === null || userDB === void 0 ? void 0 : userDB.image,
        content: body.content,
        postId: body.postId
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
});
exports.postComment = postComment;
const putComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const body = underscore_1.default.pick(req.body, ['content']);
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
});
exports.putComment = putComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
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
});
exports.deleteComment = deleteComment;
