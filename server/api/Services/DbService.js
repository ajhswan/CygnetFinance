"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
function connectionLogs(error) {
    if (error) {
        console.log(error.message);
    }
    else {
        console.log(`Succesfully connected to MongoDB`, mongoose_1.default.connection.name);
        mongoose_1.default.connection.on('error', console.error.bind(console, 'MongoDb connection error:'));
    }
    return {
        connectionLog: connectionLogs
    };
}
exports.connectionLogs = connectionLogs;
function DbConnect(dbURI) {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 5
    };
    return mongoose_1.default.connect(dbURI, options, connectionLogs);
}
exports.DbConnect = DbConnect;
module.exports.DbConnect = DbConnect;
