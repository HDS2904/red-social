"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_name = process.env.PROJECT_NAME || "redsocial";
const node_env = process.env.NODE_ENV || 'dev';
const port = process.env.PORT || '3000';
const jsonwebtoken = process.env.JWT_TOKEN || 'tokensecreto-de-desarrollo';
const token_time = process.env.TOKEN_TIME || 60 * 60 * 24;
const mongo_user = process.env.MONGODB_USER || 'hds';
const mongo_pass = process.env.MONGODB_PASS || 'hds2904';
var aux;
if (node_env === 'dev') {
    aux = 'mongodb://localhost/redsocial';
}
else {
    aux = 'mongodb+srv://bd3:unmsm@cluster0.z6sbo.mongodb.net/redsocial?retryWrites=true&w=majority';
}
const mongo_uri = process.env.MONGODB_URI || aux;
exports.default = {
    project_name,
    node_env,
    port,
    jsonwebtoken,
    token_time,
    DB: {
        USER: mongo_user,
        PASSWORD: mongo_pass,
        URI: mongo_uri
    }
};
// export default {
//     project_name: process.env.PROJECT_NAME || "hdsdeveloper",
//     node_env: process.env.NODE_ENV || 'dev',
//     port: process.env.PORT || '3000',
//     jsonwebtoken: process.env.JWT_TOKEN || 'tokensecreto',
//     DB: {
//         URI_MongoLocal: 'mongodb://localhost/hdsdeveloper',
//         URI_MongoAtlas: 'mongodb+srv://bd3:unmsm@cluster0.z6sbo.mongodb.net/hdsdeveloper?retryWrites=true&w=majority'
//     }
// }
