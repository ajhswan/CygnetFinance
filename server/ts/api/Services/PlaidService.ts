
import express, { Request, Response } from 'express';
import plaid from 'plaid';
import passport from 'passport';
import moment from 'moment';
import mongoose from 'mongoose';
const router = express.Router();

import { Account } from '../../models/Account';
import { User } from '../../models/User';

const PLAID_CLIENT_ID = '';
const PLAID_SECRET = '';
const PLAID_PUBLIC_KEY = '';

const client = new plaid.Client(
    PLAID_CLIENT_ID,
    PLAID_SECRET,
    PLAID_PUBLIC_KEY,
    plaid.environments.development,
    {version: '2019-05-29'}
);

interface IRequest extends Request {
    user: {
        id: string
    }
}

export function newAccount(request: IRequest, response: Response): void {
    const PUBLIC_TOKEN = request.body.public_token;

    const userId = request.user.id;
    const institution = request.body.metadata.institution;
    const { name, institution_id } = institution;

    if (PUBLIC_TOKEN) {
        client
            .exchangePublicToken(PUBLIC_TOKEN)
            .then(exchangeResponse => {
                const ACCESS_TOKEN = exchangeResponse.access_token;
                const ITEM_ID = exchangeResponse.item_id;

                Account.findOne({
                    userId: request.user.id,
                    institutionId: institution_id
                })
                .then(account => {
                    if (account) {
                        console.log('Account already exists');
                    } else {
                        const newAccount = new Account({
                            userId: userId,
                            accessToken: ACCESS_TOKEN,
                            itemID: ITEM_ID,
                            institutionId: institution_id,
                            institutionName: name
                        });

                        newAccount.save().then(account => response.json(account));
                    }
                })
                .catch(error => console.log('Mongo Error',error));
            })
            .catch(error => console.log('Plaid Error', error));
    }
}

export function deleteAccount(request: Request, response: Response) {
    Account.findById(request.params.id)
    .then(account => {
        account?.remove()
        .then(() => response.json({ success: true }));
    })
    .catch(error => console.log(error));
}

export function fetchAccounts(request: IRequest, response: Response) {
    Account.find({ userId: request.user.id })
    .then(accounts => response.json(accounts))
    .catch(error => console.log(error));
}

export function fetchTransactions(request: Request, response: Response) {
    const now = moment();
    const today = now.format('YYYY-MM-DD');
    const thirtyDaysAgo = now.subtract(30, 'days').format('YYY-MM-DD');

    let transactions: plaid.Transaction[] | any = [];

    const accounts = request.body;
    

    if (accounts) {
        accounts.forEach(function(account: any) {
            const ACCESS_TOKEN = account.accessToken;
            const institutionName = account.institutionName;

            client
            .getTransactions(ACCESS_TOKEN, thirtyDaysAgo, today)
            .then(result => {
                transactions.push({
                    accountName: institutionName,
                    transaction: result.transactions
                });
                if (transactions.length === accounts.length) {
                    response.json(transactions);
                }
            })
            .catch(error => console.log(error));
        });
    }
}