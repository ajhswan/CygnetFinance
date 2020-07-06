import express from  'express';
import passport from 'passport';
// import { setRemainingRoutes } from './Controllers/RemainingController';
import { registerUser, loginUser } from './Controllers/UserController';
import { addPlaidAccount, deletePlaidAccount, fetchPlaidAccounts, fetchPlaidTransactions } from './Controllers/PlaidController';



export function routes(app: express.Application) {
    
    app.post('/users/register', registerUser);
    app.post('/users/login', loginUser);
    app.post('/accounts/add', passport.authenticate('jwt', { session: false }), addPlaidAccount);
    app.delete('/accounts/:id',passport.authenticate('jwt', { session: false }), deletePlaidAccount);
    app.get('/accounts', passport.authenticate('jwt', { session: false }), fetchPlaidAccounts );
    app.get('accounts/transactions', passport.authenticate('jwt', { session: false }), fetchPlaidTransactions);
}

module.exports = routes;