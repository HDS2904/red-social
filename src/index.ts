import config from './config/config';
import Server from './server/server';
import userRoutes from './routes/routes';
import cors from 'cors';
import morgan from 'morgan';
import './database/db';

const server = Server.init( config.port );

server.setConfig( cors() );
server.setConfig( morgan('dev') );

server.configBasic();
server.setRouter( userRoutes );

server.start( () => {
    console.log(`Servidor lanzado desde el puerto ${config.port}`);
} );