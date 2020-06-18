import express from  'express';
import { setRemainingRoutes } from './Controllers/RemainingController';
import { registerUser, loginUser } from './Controllers/UserController';



export function routes(app: express.Application) {
    
    app.get('/', (request, response) => response.send('success'));
    app.get('*', setRemainingRoutes);
    app.post('/users/register', registerUser)
    app.post('/users/login', loginUser)
}

module.exports = routes;