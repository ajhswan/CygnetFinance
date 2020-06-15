import express from  'express';
import { setRemainingRoutes } from './Controllers/RemainingController';
import { registerUser, loginUser } from './Controllers/UserController';



export function routes(app: express.Application) {
    
    app.get('/', (request, response) => response.send('success'));
    app.get('*', setRemainingRoutes);
    app.post('/user/register', registerUser)
    app.post('/user/login', loginUser)
}

module.exports = routes;