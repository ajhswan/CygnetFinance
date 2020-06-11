import mongoose, { Mongoose, ConnectionOptions } from 'mongoose';
import { MongoError } from 'mongodb';
import { DbConnect, connectionLogs }  from '../DbService';

jest.mock('mongoose');

describe('Connection to database', () => {
    test('Test Success - should connect to database successfully', done => {
        const consoleLogSpyOn = jest.spyOn(console, 'log');
        const mongooseConnectSpyOn = jest
        .spyOn<Mongoose, 'connect'>(mongoose, 'connect')
        .mockImplementationOnce((uris: string, options?: ConnectionOptions, callback?: (error? : MongoError) => void) => {
            if (callback) {
                callback();
                done();
            }
            return Promise.resolve(mongoose);
        });
        const dbURI = 'localhost'
        DbConnect('localhost');
        expect(mongooseConnectSpyOn).toBeCalledWith(
            dbURI,
             { useNewUrlParser:true, useUnifiedTopology: true, poolSize: 5 },
             connectionLogs
              
    );
    expect(consoleLogSpyOn).toBeCalledWith(`Succesfully connected to MongoDB`);
    consoleLogSpyOn.mockRestore();
    });

    test('Test Fail - database connection should error', done => {
        const consoleLogSpyOn = jest.spyOn(console, 'log');
        const mongooseConnectSpyOn = jest
        .spyOn<Mongoose, 'connect'>(mongoose, 'connect')
        .mockImplementationOnce((uris: string, options?: ConnectionOptions, callback?: (error? : MongoError) => void) => {
            if (callback) {
                callback( new MongoError('Connection error'));
                done();
            }
            return Promise.resolve(mongoose);
        });
        const dbURI = 'localhost'
        DbConnect('localhost');
        expect(mongooseConnectSpyOn).toBeCalledWith(
            dbURI,
             { useNewUrlParser:true, useUnifiedTopology: true, poolSize: 5 },
             connectionLogs        
        );
        expect(consoleLogSpyOn).toBeCalledWith('Connection error');
        consoleLogSpyOn.mockRestore();
        
    })
});

