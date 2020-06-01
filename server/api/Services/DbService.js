"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
function DbConnect() {
    const dbURI = require('../../config/keys').MONGODB_URI;
    console.log(dbURI);
    mongoose_1.default
        .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
        return console.log(`Succesfully connected to ${dbURI}`);
    })
        .catch((Error) => {
        console.log('Error connecting to databse:', Error);
        return process.exit(1);
    });
}
module.exports.DbConnect = DbConnect;
