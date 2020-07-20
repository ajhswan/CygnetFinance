import express from 'express';
import passport from 'passport';
import { 
    addPlaidAccount, 
    deletePlaidAccount, 
    fetchPlaidAccounts, 
    fetchPlaidTransactions }   
    from '../Controllers/PlaidController';


const router = express.Router();

router.post('/accounts/add', passport.authenticate('jwt', {session: false}), addPlaidAccount); 
router.delete('/accounts/:id', passport.authenticate('jwt', {session: false}), deletePlaidAccount);
router.get('/accounts', passport.authenticate('jwt', {session: false}), fetchPlaidAccounts );
router.post('/accounts/transactions', passport.authenticate('jwt', {session: false}), fetchPlaidTransactions);

module.exports = router
