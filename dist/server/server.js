"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class Server {
    constructor(port) {
        this.app = express_1.default();
        this.port = port;
    }
    static init(port) {
        return new Server(port);
    }
    configBasic() {
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.json());
    }
    setRouter(route) {
        this.app.use(route);
    }
    setConfig(route) {
        this.app.use(route);
    }
    start(callback) {
        this.app.listen(this.port, callback);
    }
}
exports.default = Server;
