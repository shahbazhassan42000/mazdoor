import mongoose from 'mongoose';
import config from "../config"

const dbConnect=()=>{
    const url = process.env.MONGO_URL || config.dbURL;

    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    mongoose.connect(url, connectionParams)
        .then(
            () => {
                console.log('Database connected successfully');
            },
            err => {
                console.log('ERROR!!! While connecting to the database');
                console.log(err);
            }
        )
        .catch((err) => {
            console.error(`Error connecting to the database. n${err}`);
        })
    mongoose.set('debug', true);
    mongoose.connection.on('disconnected', () => {
        console.log('Database loss connection');
    });
    mongoose.connection.on('reconnect', () => {
        console.log('Database reconnected');
    });
    mongoose.connection.on('reconnectFailed', () => {
        console.log('Failed to reconnect database');
    });
}
export default dbConnect;

