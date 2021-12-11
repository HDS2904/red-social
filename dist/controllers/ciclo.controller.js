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
exports.putCiclo = exports.postCiclo = exports.getCiclo = void 0;
const ciclo_1 = __importDefault(require("../models/ciclo"));
const getCiclo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    ciclo_1.default.find({}, 'name description')
        .skip(desde)
        .limit(limite)
        .exec((err, ciclos) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        ciclo_1.default.countDocuments((err, cont) => {
            res.status(201).json({
                ok: true,
                ciclos,
                nDatos: cont
            });
        });
    });
});
exports.getCiclo = getCiclo;
const postCiclo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const ciclo = new ciclo_1.default(body);
    yield ciclo.save((err, cicloDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!cicloDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (cicloDB) {
            return res.status(400).json({
                ok: true,
                ciclo: cicloDB
            });
        }
    });
});
exports.postCiclo = postCiclo;
const putCiclo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    ciclo_1.default.findByIdAndUpdate(id, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});
exports.putCiclo = putCiclo;
