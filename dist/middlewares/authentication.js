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
exports.verificaAdmRol = exports.vToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const user_1 = __importDefault(require("../models/user"));
let vToken = (req, res, next) => {
    const token = req.header('token');
    if (!token) {
        res.status(401).json({
            ok: false,
            err: {
                message: 'Token no existe'
            }
        });
    }
    else {
        try {
            const infDecoded = jsonwebtoken_1.default.verify(token, config_1.default.jsonwebtoken);
            req.id = infDecoded.id;
            next();
        }
        catch (error) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Acceso denegado'
                }
            });
        }
    }
};
exports.vToken = vToken;
const verificaAdmRol = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.findOne({ _id: req.id }, (err, usuarioDB) => {
        if ((usuarioDB === null || usuarioDB === void 0 ? void 0 : usuarioDB.isStaff) === 'ADMIN_ROLE') {
            next();
        }
        else {
            return res.json({
                ok: false,
                err: {
                    message: 'Usted no es el ADMINISTRADOR'
                }
            });
        }
    });
});
exports.verificaAdmRol = verificaAdmRol;
