import mongoose from "mongoose";

const dbConnect=()=>{
    const DB_URL = process.env.MONGO_URL;
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    mongoose.connect(DB_URL, connectionParams,{server: {auto_reconnect: true}})
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

