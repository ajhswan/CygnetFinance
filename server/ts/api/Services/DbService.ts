
import Mongoose from 'mongoose';
// const Mongoose = require('mongoose');

function DbConnect() :void {

    const dbURI: string = require('../../config/keys').MONGODB_URI;

    Mongoose
        .connect(dbURI, { useNewUrlParser:true, useUnifiedTopology: true })
        .then(() => {
            return console.log(`Succesfully connected to ${dbURI}`);
        })
        .catch((Error: any) => {
            console.log('Error connecting to databse:', Error);
            return process.exit(1);
        });
}

module.exports.DbConnect = DbConnect;