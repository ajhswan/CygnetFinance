"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const dbURI = require('../../config/keys').MONGODB_URI;
function connectionLogs(error) {
    if (error) {
        console.log(error.message);
    }
    else {
        console.log(`Succesfully connected to ${dbURI}`);
    }
    return {
        connectionLog: connectionLogs
    };
}
exports.connectionLogs = connectionLogs;
function DbConnect() {
    return mongoose_1.default.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, connectionLogs);
}
exports.DbConnect = DbConnect;
module.exports.DbConnect = DbConnect;
