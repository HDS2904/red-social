"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../middlewares/authentication");
const loginRoute = __importStar(require("../controllers/login.controller"));
const userRoute = __importStar(require("../controllers/user.controller"));
const postRoute = __importStar(require("../controllers/post.conrtoller"));
const router = express_1.Router();
router.post('/login', loginRoute.singIn);
router.get('/usuario', [authentication_1.vToken, authentication_1.verificaAdmRol], userRoute.getUser);
router.get('/usuario/:id', authentication_1.vToken, userRoute.getUserById);
router.post('/usuario', userRoute.postUser);
router.put('/usuario/:id', authentication_1.vToken, userRoute.putUser);
router.delete('/usuario/:id', authentication_1.vToken, userRoute.deleteUser);
router.get('/post', authentication_1.vToken, postRoute.getPost);
router.get('/post/:id', authentication_1.vToken, postRoute.getPostById);
router.post('/post', authentication_1.vToken, postRoute.postPost);
router.put('/post/:id', authentication_1.vToken, postRoute.putPost);
router.delete('/post/:id', authentication_1.vToken, postRoute.deletePost);
exports.default = router;
