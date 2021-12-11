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
exports.singIn = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const singIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    if (!body.email || !body.password) {
        return res.status(400).json({
            msg: 'Ingrese un email o contraseña valida'
        });
    }
    const userDB = yield user_1.default.findOne({ email: body.email });
    if (!userDB) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Usuario* o contraseña incorrecta'
            }
        });
    }
    let est = yield userDB.comparePassword(body.password);
    if (!est) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Usuario o contraseña* incorrecta'
            }
        });
    }
    res.json({
        ok: true,
        usuario: userDB,
        token: createToken(userDB)
    });
});
exports.singIn = singIn;
function createToken(user) {
    return jsonwebtoken_1.default.sign({ id: user._id }, config_1.default.jsonwebtoken, { expiresIn: config_1.default.token_time });
}
