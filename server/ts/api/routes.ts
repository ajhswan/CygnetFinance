import express from  'express';
import passport from 'passport';
// import { setRemainingRoutes } from './Controllers/RemainingController';
import { registerUser, loginUser } from './Controllers/UserController';
import { addPlaidAccount } from './Controllers/PlaidController';



export function routes(app: express.Application) {
    
    app.post('/users/register', registerUser)
    app.post('/users/login', loginUser)
    app.post('/accounts/add', passport.authenticate('jwt', { session: false }), addPlaidAccount)
}

module.exports = routes;