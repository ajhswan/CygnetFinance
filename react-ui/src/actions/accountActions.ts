import axios from 'axios';
import { ADD_ACCOUNT, DELETE_ACCOUNT, GET_ACCOUNTS, ACCOUNTS_LOADING, GET_TRANSACTIONS, TRANSACTIONS_LOADING } from './types';
import { Dispatch } from 'redux';

interface IPlaidData {
    accounts: any,
    id: string
    
}



export const addAccount = (plaidData: IPlaidData) => (dispatch: Dispatch<any>) => {
    const accounts = plaidData.accounts;
    axios
    .post('plaid/accounts/add', plaidData)
    .then(response => dispatch({
        type: ADD_ACCOUNT,
        payload: response.data
        })
    )
    .then(data => accounts ? dispatch(getTransactions(accounts.concat(data.payload))) : null)
    .catch(error => console.log(error));
};

export const deleteAccount = (plaidData: IPlaidData) => (dispatch: any) => {
    if (window.confirm('Are you sure you want to remove this account?')) {
        const id = plaidData.id;
        const newAccounts = plaidData.accounts.filter(
            (account: any) => account._id !== id
        );
        axios
        .delete(`/plaid/accounts/${id}`)
        .then(response => dispatch({
                type: DELETE_ACCOUNT,
                payload: id
            })
        )
        .then(newAccounts ? dispatch(getTransactions(newAccounts)) : null)
        .catch(error => console.log(error));     
    }
}

export const getAccounts = () => (dispatch: Dispatch) => {
    dispatch(setAccountsLoading());
    axios
    .get('/plaid/accounts')
    .then(response => dispatch({
        type: GET_ACCOUNTS,
        payload: response.data
        })
    )
    .catch(error => dispatch({
        type: GET_ACCOUNTS,
        payload: null
        })
    );
}

export const setAccountsLoading = () => {
    return {
        type: ACCOUNTS_LOADING
    };
}

export const getTransactions = (plaidData: IPlaidData) => (dispatch: Dispatch) => {
    dispatch(setTransactionsLoading());
    axios
    .post('plaid/accounts/transactions', plaidData)
    .then(response => dispatch({
        type: GET_TRANSACTIONS,
        payload: response.data
        })
    )
    .catch(error => dispatch({
        type: GET_TRANSACTIONS,
        payload: null
        })
    );
}

export const setTransactionsLoading = () => {
    return {
        type: TRANSACTIONS_LOADING
    };
} 