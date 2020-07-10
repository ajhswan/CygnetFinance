// import express from  'express';
// const router = express.Router();
// import passport from 'passport';
// // import { setRemainingRoutes } from './Controllers/RemainingController';
// import { registerUser, loginUser } from '../Controllers/UserController';
// import { addPlaidAccount, deletePlaidAccount, fetchPlaidAccounts, fetchPlaidTransactions } from '../Controllers/PlaidController';

//     router.post('/users/register', registerUser);
//     router.post('/users/login', loginUser);
//     router.get('/users/test', function (request, response) {
//         response.set('Content-Type', 'application/json');
//         response.json('testing tsc workes')
//     });
//     router.post('/plaid/accounts/add', passport.authenticate('jwt', { session: false }), addPlaidAccount);
//     router.delete('/plaid/accounts/:id',passport.authenticate('jwt', { session: false }), deletePlaidAccount);
//     router.get('/plaid/accounts', passport.authenticate('jwt', { session: false }), fetchPlaidAccounts );
//     router.get('/plaid/accounts/transactions', passport.authenticate('jwt', { session: false }), fetchPlaidTransactions);

// module.exports = router;