
import mongoose, { Mongoose } from 'mongoose';
import { MongoError} from 'mongodb';
// const Mongoose = require('mongoose');


export function connectionLogs(error?: MongoError){
    if (error) {
        console.log(error.message);
    } else {
        console.log(`Succesfully connected to MongoDB`, mongoose.connection.host)
        mongoose.connection.on('error', console.error.bind(console, 'MongoDb connection error:'))
    }
    return {
        connectionLog: connectionLogs
    };
}

export function DbConnect(dbURI: string): Promise<Mongoose> {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 5
    }
    return mongoose.connect(dbURI, options, connectionLogs)
}

module.exports.DbConnect = DbConnect;