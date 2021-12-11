"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config/config"));
const server_1 = __importDefault(require("./server/server"));
const routes_1 = __importDefault(require("./routes/routes"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
require("./database/db");
const server = server_1.default.init(config_1.default.port);
server.setConfig(cors_1.default());
server.setConfig(morgan_1.default('dev'));
server.configBasic();
server.setRouter(routes_1.default);
server.start(() => {
    console.log(`Servidor lanzado desde el puerto ${config_1.default.port}`);
});
