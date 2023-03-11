import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morganBody from 'morgan-body';
import config from './config';
import routes from './routes';
import middlewares from './middlewares';
import dbConnect from "./utils/db";
import * as path from "path";


const app = express();
app.server = http.createServer(app);

const {errorHandler} = middlewares.errorHandler;

// middleware
app.use(cors());


app.use(
    bodyParser.json({
        limit: config.bodyLimit,
    })
);

// hook morganBody to express app
if (process.env.NODE_ENV === 'development') {
    morganBody(app);
}

//connecting db
dbConnect();

// api routes to /api
app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    app.use(express.static('client/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
}

// global error handler function
app.use(errorHandler);

app.server.listen(config.port);

console.log(`Started on 'http://localhost:${app.server.address().port}'`);

export default app;
