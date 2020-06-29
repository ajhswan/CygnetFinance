import axios from 'axios';
import { ADD_ACCOUNT, DELETE_ACCOUNT, GET_ACCOUNTS, ACCOUNTS_LOADING, GET_TRANSACTIONS, TRANSACTIONS_LOADING } from './types';

const addAccount = plaidData => dispatch => {
    const accounts = plaidData.accounts;
    axios
    .post('plaid/accounts/add', plaidData)
    .then(response => dispatch( {
        type: 
    }))
}
