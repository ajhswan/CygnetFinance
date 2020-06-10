"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const supertest_1 = tslib_1.__importDefault(require("supertest"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const app = require('../../index');
const request = supertest_1.default(app);
const dbName = 'cygnetFinanceTestRoutes';
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10
};
const dbURI = `mongodb://localhost:27017/${dbName}`;
beforeAll(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(dbURI, options);
}));
describe('POST /user/register', () => {
    test('Success Test - Register new user', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/user/register')
            .send({
            name: 'barry',
            email: 'barry@domain.com',
            password: 'password',
            password2: 'password'
        });
        expect(response.status).toBe(200);
        expect(response.body).toBe('New user added successfully');
        done();
    }));
    test('Fail Test - Register new user: missing name', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/user/register')
            .send({
            name: '',
            email: 'barry@domain.com',
            password: 'password',
            password2: 'password'
        });
        expect(response.status).toBe(400);
        expect(response.body.name).toBe('Name field is required');
        done();
    }));
    test('Fail Test - Register new user: missing email', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/user/register')
            .send({
            name: 'barry',
            email: '',
            password: 'password',
            password2: 'password'
        });
        expect(response.status).toBe(400);
        expect(response.body.email).toBe('Email field is required');
        done();
    }));
    test('Fail Test - Register new user: invalid email', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/user/register')
            .send({
            name: 'barry',
            email: 'barry.com',
            password: 'password',
            password2: 'password'
        });
        expect(response.status).toBe(400);
        expect(response.body.email).toBe('Email is invalid');
        done();
    }));
    test('Fail Test - Register new user: missing password', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/user/register')
            .send({
            name: 'barry',
            email: 'barry@domain.com',
            password: '',
            password2: 'password'
        });
        expect(response.status).toBe(400);
        expect(response.body.password).toBe('Password must be at least 6 characters and no more than 30 characters');
        done();
    }));
    test('Fail Test - Register new user: missing password2', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/user/register')
            .send({
            name: 'barry',
            email: 'barry@domain.com',
            password: 'password',
            password2: ''
        });
        expect(response.status).toBe(400);
        expect(response.body.password2).toBe('Passwords must match');
        done();
    }));
    test('Fail Test - Register new user: name space', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/user/register')
            .send({
            name: ' ',
            email: 'barry@domain.com',
            password: 'password',
            password2: 'password'
        });
        expect(response.status).toBe(400);
        expect(response.body.name).toBe('Name field is required');
        done();
    }));
    test('Fail Test - Register new user: name specialChar', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/user/register')
            .send({
            name: '<>@/<div> ',
            email: 'harry@domain.com',
            password: 'password',
            password2: 'password'
        });
        expect(response.status).toBe(200);
        expect(response.body).toBe('New user added successfully');
        done();
    }));
});
