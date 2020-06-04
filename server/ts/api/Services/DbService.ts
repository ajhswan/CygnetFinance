
import mongoose, { Mongoose } from 'mongoose';
import { MongoError} from 'mongodb';
// const Mongoose = require('mongoose');

const dbURI: string = require('../../config/keys').MONGODB_URI;

export function connectionLogs(error?: MongoError){
    if (error) {
        console.log(error.message);
    } else {
        console.log(`Succesfully connected to ${dbURI}`)
    }
    return {
        connectionLog: connectionLogs
    };
}

export function DbConnect(): Promise<Mongoose> {

    return mongoose.connect(dbURI, { useNewUrlParser:true, useUnifiedTopology: true },connectionLogs)
}

module.exports.DbConnect = DbConnect;