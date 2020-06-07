"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const mongodb_1 = require("mongodb");
const DbService_1 = require("../DbService");
jest.mock('mongoose');
describe('Connection to database', () => {
    test('Test Success - should connect to database successfully', done => {
        const consoleLogSpyOn = jest.spyOn(console, 'log');
        const mongooseConnectSpyOn = jest
            .spyOn(mongoose_1.default, 'connect')
            .mockImplementationOnce((uris, options, callback) => {
            if (callback) {
                callback();
                done();
            }
            return Promise.resolve(mongoose_1.default);
        });
        const dbURI = 'localhost';
        DbService_1.DbConnect('localhost');
        expect(mongooseConnectSpyOn).toBeCalledWith(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, DbService_1.connectionLogs);
        expect(consoleLogSpyOn).toBeCalledWith(`Succesfully connected to MongoDB`);
        consoleLogSpyOn.mockRestore();
    });
    test('Test Fail - database connection should error', done => {
        const consoleLogSpyOn = jest.spyOn(console, 'log');
        const mongooseConnectSpyOn = jest
            .spyOn(mongoose_1.default, 'connect')
            .mockImplementationOnce((uris, options, callback) => {
            if (callback) {
                callback(new mongodb_1.MongoError('Connection error'));
                done();
            }
            return Promise.resolve(mongoose_1.default);
        });
        const dbURI = 'localhost';
        DbService_1.DbConnect('localhost');
        expect(mongooseConnectSpyOn).toBeCalledWith(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, DbService_1.connectionLogs);
        expect(consoleLogSpyOn).toBeCalledWith('Connection error');
        consoleLogSpyOn.mockRestore();
    });
});
