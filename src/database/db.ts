import mongoose, { ConnectionOptions } from 'mongoose';
import config from '../config/config';

(async () => {
    try {
        const mongoOption: ConnectionOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        };
        const db = await mongoose.connect( config.DB.URI, mongoOption );
        console.log('Conección a mongodb exitosa');
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
})()
