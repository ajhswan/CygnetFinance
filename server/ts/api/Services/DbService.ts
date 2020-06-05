
import mongoose, { Mongoose } from 'mongoose';
import { MongoError} from 'mongodb';
// const Mongoose = require('mongoose');

const dbURI: string = require('../../config/keys').MONGODB_URI;

export function connectionLogs(error?: MongoError){
    if (error) {
        console.log(error.message);
    } else {
        console.log(`Succesfully connected to MongoDB`)
    }
    return {
        connectionLog: connectionLogs
    };
}

export function DbConnect(dbURI: string): Promise<Mongoose> {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    return mongoose.connect(dbURI, options, connectionLogs)
}

module.exports.DbConnect = DbConnect;