import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';

// Imports routes
import authRoutes from './routes/auth.routes';


const app = express();


// save a variable in express
app.set('pkg', pkg);

app.use(morgan('dev'));
// receive json files
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    });
});

//routes
app.use('/api/auth', authRoutes );


export default app;