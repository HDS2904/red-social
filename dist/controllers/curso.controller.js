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
exports.putCourse = exports.postCourse = exports.getCourse = void 0;
const course_1 = __importDefault(require("../models/course"));
const getCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    course_1.default.find({}, 'name description')
        .skip(desde)
        .limit(limite)
        .exec((err, cursos) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        course_1.default.countDocuments((err, cont) => {
            res.status(201).json({
                ok: true,
                cursos,
                nDatos: cont
            });
        });
    });
});
exports.getCourse = getCourse;
const postCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const curso = new course_1.default(body);
    yield curso.save((err, cursoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!cursoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (cursoDB) {
            return res.status(400).json({
                ok: true,
                curso: cursoDB
            });
        }
    });
});
exports.postCourse = postCourse;
const putCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    course_1.default.findByIdAndUpdate(id, { new: true, runValidators: true }, (err, cursoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: cursoDB
        });
    });
});
exports.putCourse = putCourse;
