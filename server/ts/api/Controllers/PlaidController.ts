import { Request, Response } from 'express';
import { IRequest } from '../../types';
import { 
    newAccount, 
    deleteAccount, 
    fetchAccounts, 
    fetchTransactions, 
    exchangeTokens,
    getPlaidTransactions } 
    from '../Services/PlaidService';

export function addPlaidAccount(request: Request, response: Response) {
    newAccount(request as any, response);
}

export function deletePlaidAccount(request: Request, response: Response) {
    deleteAccount(request, response);
}

export function fetchPlaidAccounts(request: IRequest, response: Response) {
    fetchAccounts(request, response);
}

export function fetchPlaidTransactions(request: Request, response: Response) {
    fetchTransactions(request, response);
}
//getting palid to work creating this temp controller used for testing 
export function receivePublicToken(request: Request, response: Response) {
    exchangeTokens(request, response);
}
//getting plaid to work creating this temp controller used for testing
export function getTransactions(request: Request, response: Response) {
    getPlaidTransactions(request, response);
}