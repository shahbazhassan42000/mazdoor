import express from "express";
import dotenv from "dotenv";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import morganBody from "morgan-body";
import routes from "./routes/index.js";
import middlewares from "./middlewares/index.js";
import dbConnect from "./utils/db.js";
import path from 'path';


dotenv.config();


const app = express();
app.server = http.createServer(app);

const { errorHandler } = middlewares.errorHandler;

// middleware
app.use(cors());


app.use(
    bodyParser.json({
        limit: process.env.BODY_LIMIT,
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
    app.get('*', (req, res) => res.sendFile(path.resolve('client', 'build', 'index.html')));
}

// global error handler function
app.use(errorHandler);
app.server.listen(process.env.PORT);

console.log(`Started on ${process.env.BASE_URL}`);



export default app;
