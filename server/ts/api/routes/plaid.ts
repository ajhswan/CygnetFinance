import express from 'express';
import passport from 'passport';
import { 
    addPlaidAccount, 
    deletePlaidAccount, 
    fetchPlaidAccounts, 
    fetchPlaidTransactions, 
    receivePublicToken,
    getTransactions }   
    from '../Controllers/PlaidController';


const router = express.Router();



// var PUBLIC_TOKEN = null;
var ACCESS_TOKEN: any = null;
var ITEM_ID: any = null;

router.post('/accounts/add', receivePublicToken);
    
    // addPlaidAccount);
router.delete('/accounts/:id', deletePlaidAccount);
router.get('/accounts', fetchPlaidAccounts );
router.post('/accounts/transactions', fetchPlaidTransactions);

module.exports = router
