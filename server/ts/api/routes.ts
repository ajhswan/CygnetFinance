import express from  'express';
import path from 'path'
// import { setRemainingRoutes } from './Controllers/RemainingController';
import { registerUser, loginUser } from './Controllers/UserController';



export function routes(app: express.Application) {
    
    app.post('/users/register', registerUser)
    app.post('/users/login', loginUser)
}

module.exports = routes;