import supertest from 'supertest';
import mongoose from 'mongoose';
import { User }  from '../../models/User';
const app = require('../../index');
const request = supertest(app);

const dbName = 'cygnetFinanceTestRoutes'
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 10
    }
    const dbURI = `mongodb://localhost:27017/${dbName}`;



beforeAll(async () => {
    await mongoose.createConnection(dbURI, options); 
})

beforeEach(async () => {
    await mongoose.connection.collections['users'].drop(error => console.log('drop'));
})

describe('POST /user/register', () => {

    test('Success Test - Register new user', async (done) => {
            const response = await request.post('/user/register')
            .send({ 
                name: 'barry',
                email: 'barry@domain.com',
                password: 'password',
                password2: 'password'
            })
            expect(response.status).toBe(200);
            expect(response.body).toBe('New user added successfully')
            done();
    })

    test('Fail Test - Register new user: missing name', async (done) => {
        const response = await request.post('/user/register')
            .send({ 
                name: '',
                email: 'barry@domain.com',
                password: 'password',
                password2: 'password'
            })
            expect(response.status).toBe(400);
            expect(response.body.name).toBe('Name field is required')
            done();
    })

    test('Fail Test - Register new user: missing email', async (done) => {
        const response = await request.post('/user/register')
            .send({ 
                name: 'barry',
                email: '',
                password: 'password',
                password2: 'password'
            })
            expect(response.status).toBe(400);
            expect(response.body.email).toBe('Email field is required')
            done();
    })

    test('Fail Test - Register new user: invalid email', async (done) => {
        const response = await request.post('/user/register')
            .send({ 
                name: 'barry',
                email: 'barry.com',
                password: 'password',
                password2: 'password'
            })
            expect(response.status).toBe(400);
            expect(response.body.email).toBe('Email is invalid')
            done();
    })

    test('Fail Test - Register new user: missing password', async (done) => {
        const response = await request.post('/user/register')
            .send({ 
                name: 'barry',
                email: 'barry@domain.com',
                password: '',
                password2: 'password'
            })
            expect(response.status).toBe(400);
            expect(response.body.password).toBe('Password must be at least 6 characters and no more than 30 characters')
            done();
    })

    test('Fail Test - Register new user: missing password2', async (done) => {
        const response = await request.post('/user/register')
            .send({ 
                name: 'barry',
                email: 'barry@domain.com',
                password: 'password',
                password2: ''
            })
            expect(response.status).toBe(400);
            expect(response.body.password2).toBe('Passwords must match')
            done();
    })

    test('Fail Test - Register new user: name space', async (done) => {
        const response = await request.post('/user/register')
            .send({ 
                name: ' ',
                email: 'barry@domain.com',
                password: 'password',
                password2: 'password'
            })
            expect(response.status).toBe(400);
            expect(response.body.name).toBe('Name field is required')
            done();
    })

    test('Fail Test - Register new user: name specialChar', async (done) => {
        const response = await request.post('/user/register')
            .send({ 
                name: '<>@/<div> ',
                email: 'harry@domain.com',
                password: 'password',
                password2: 'password'
            })
            await expect(response.status).toBe(200);
            await expect(response.body).toBe('New user added successfully')
            done();
    })
}) 

