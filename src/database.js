import mongoose from 'mongoose';
import config from './config.js';

mongoose.connect(config.dbURL, config.dbOptions)
        .then( db => console.log('Db is connected') )
        .catch( error => console.log(error) )
