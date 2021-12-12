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
exports.deleteUser = exports.putUser = exports.postUser = exports.getUserById = exports.getUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const underscore_1 = __importDefault(require("underscore"));
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde || 0);
    const limite = Number(req.query.limite || 10);
    const userDB = yield user_1.default.find({ isActive: true }, 'username firstName lastName image email isStaff isActive updateAt')
        .skip(desde)
        .limit(limite)
        .exec();
    if (!userDB) {
        return res.status(400).json({
            ok: false,
            message: 'Ocurrio un error al obtener los datos de los usuarios'
        });
    }
    const userN = yield user_1.default.countDocuments();
    if (!userN && userN !== 0) {
        return res.status(400).json({
            ok: false,
            message: 'Ocurrio un error al obtener los datos de los usuarios'
        });
    }
    res.status(201).json({
        ok: true,
        users: userDB,
        nDatos: userN
    });
});
exports.getUser = getUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const userDB = yield user_1.default.findById(id);
    if (!userDB) {
        return res.status(400).json({
            ok: false,
            message: 'Ocurrio un error al obtener los datos del usuario'
        });
    }
    res.status(201).json({
        ok: true,
        user: userDB
    });
});
exports.getUserById = getUserById;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const user = new user_1.default({
        username: body.username,
        firstName: body.firstName,
        lastName: body.lastName,
        image: body.image,
        email: body.email,
        password: body.password,
        isStaff: body.isStaff,
        isActive: body.isActive,
    });
    const userDB = yield user.save();
    if (!userDB) {
        return res.status(400).json({
            ok: false,
            message: 'Ocurrio un error al guardar el usuario'
        });
    }
    res.status(201).json({
        ok: true,
        user: userDB
    });
});
exports.postUser = postUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const body = underscore_1.default.pick(req.body, ['username', 'firstName', 'lastName', 'image', 'email', 'isActive']);
    const userDB = yield user_1.default.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!userDB) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'El usuario no existe'
            }
        });
    }
    res.json({
        ok: true,
        usuario: userDB
    });
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const nuevoEstado = { isActive: false };
    const userDB = yield user_1.default.findByIdAndUpdate(id, nuevoEstado, { new: true });
    if (!userDB) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'El usuario no existe'
            }
        });
    }
    res.json({
        ok: true,
        user: userDB
    });
});
exports.deleteUser = deleteUser;
