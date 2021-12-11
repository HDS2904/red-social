import express, {Router} from 'express';

export default class Server {

    public app: express.Application;
    public port: string;

    constructor( port: string ) {
        this.app = express();
        this.port = port;
    }

    static init ( port: string ) {
        return new Server( port );
    }

    configBasic () {
        this.app.use( express.urlencoded( { extended: false } ) );
        this.app.use( express.json() );
    }

    setRouter( route: Router) {
        this.app.use(route);
    }

    setConfig( route: any ) {
        this.app.use( route );
    }

    start ( callback: VoidFunction ) {
        this.app.listen( this.port, callback );
    }
}