import supertest from 'supertest';
import mongoose from 'mongoose';
import { User }  from '../../models/User';
const app = require('../../index');
const request = supertest(app);

const dbName = 'cygnetFinanceTestRoutes'
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 5
    }
    const dbURI = `mongodb://localhost:27017/${dbName}`;

beforeAll(async (done) => {
    await mongoose.connect(dbURI, options);
    done(); 
})

beforeEach(async (done) => {
    await mongoose.connection.collections['users'].drop(error => console.log("ok - collection drop error(expected)"));
    done();
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
            expect(mongoose.Error)
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
            expect(mongoose.Error)
            done();
    })
}) 

