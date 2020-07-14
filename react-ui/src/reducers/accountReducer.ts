import { ADD_ACCOUNT, DELETE_ACCOUNT, GET_ACCOUNTS, ACCOUNTS_LOADING, GET_TRANSACTIONS, TRANSACTIONS_LOADING } from '../actions/types';

interface IState {
    accounts: any[],
    transactions: any[],
    accountsLoading: boolean,
    transactionsLoading: boolean
};

const initialState: IState = {
    accounts: [],
    transactions: [],
    accountsLoading: false,
    transactionsLoading: false
};

export default function(state = initialState, action: any) {
    switch (action.type) {
        case ACCOUNTS_LOADING:
            return {
                ...state,
                accountsLoading: true
            };
        case ADD_ACCOUNT:
            return {
                ...state,
                accounts: [action.payload, ...state.accounts]
            };
        case DELETE_ACCOUNT:
            return {
                ...state,
                accounts: state.accounts.filter(
                    (account: any) => account._id !== action.payload
                )
            };
        case GET_ACCOUNTS:
             return {
                 ...state,
                 accounts: action.payload,
                 accountsLoading: false
             }
        case GET_TRANSACTIONS:
            return {
                ...state,
                transactions: action.payload,
                transactionsLoading: false
            };
        case TRANSACTIONS_LOADING:
            return {
                ...state,
                transactionsLoading: true
            };
        default:
            return state;
    }
}