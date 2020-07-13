
import express, { Request, Response } from 'express';
import plaid from 'plaid';
// import passport from 'passport';
import moment from 'moment';
// import mongoose from 'mongoose';
import { IRequest } from '../../types';
// const router = express.Router();


import { Account } from '../../models/Account';
import { User } from '../../models/User';
//HARD CODED NEED TO SETUP DOTENV AND MOVE INTO .ENV FILE
const PLAID_CLIENT_ID = "5eeb93a5c72d7b0013b91f98";
const PLAID_SECRET = "42fb58da0c3748d845abb2f5b0d3af";
const PLAID_PUBLIC_KEY = "3c16fb36fe08680b6ced44543c6b83";
const PLAID_ENV = "sandbox";

const client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV],
  { version: "2019-05-29" }
);
var ACCESS_TOKEN: any = null;
var PUBLIC_TOKEN = null;
var ITEM_ID: any = null;


export function newAccount(request: IRequest, response: Response): void {
    console.log('this is PlaidService.newAccount',request.user);
    PUBLIC_TOKEN = request.body.public_token;

    const userId = request.user._id;
    const institution = request.body.metadata.institution;
    const { name, institution_id } = institution;
    // if (PUBLIC_TOKEN) {
        client
            .exchangePublicToken(PUBLIC_TOKEN)
            .then(exchangeResponse => {
                ACCESS_TOKEN = exchangeResponse.access_token;
                ITEM_ID = exchangeResponse.item_id;

                Account.findOne({
                    userId: request.user._id,
                    institutionId: institution_id
                })
                .then(account => {
                    console.log(account);
                    if (account) {
                        console.log('Account already exists');
                    } else {
                        console.log('PlaidServices, hit save else')
                        const newAccount = new Account({
                            userId: userId,
                            accessToken: ACCESS_TOKEN,
                            itemId: ITEM_ID,
                            institutionId: institution_id,
                            institutionName: name
                        });

                        newAccount.save().then(account => response.json(account));
                    }
                })
                .catch(error => console.log('Mongo Error',error));
            })
            .catch(error => console.log('Plaid Error', error));
    // }
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
    const thirtyDaysAgo = now.subtract(30, 'days').format('YYYY-MM-DD');

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
                console.log(transactions);
                console.log(transactions.length, accounts.length)
                if (transactions.length === accounts.length) {
                    response.json(transactions);
                }
            })
            .catch(error => console.log(error));
        });
    }
}
//FUNCTION USED FOR TESTING TO EXCHANGE PUBLIC TOKEN FOR ACCESS TOKEN - DO NOT REMOVE
export function exchangeTokens(request: Request, response: Response) {
    let PUBLIC_TOKEN = request.body.public_token;
  // Second, exchange the public token for an access token
  client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
    let ACCESS_TOKEN = tokenResponse.access_token;
    let ITEM_ID = tokenResponse.item_id;
    response.json({
      access_token: ACCESS_TOKEN,
      item_id: ITEM_ID
    });
    console.log("access token below");
    console.log(ACCESS_TOKEN);
  });
};
// FUNCTION USED FOR TESTING GET TRANSACTION FUNCTIONALITY--DO NOT REMOVE
export function getPlaidTransactions(request: Request, response: Response) {
    // Pull transactions for the last 30 days
    let startDate = moment()
        .subtract(30, "days")
        .format("YYYY-MM-DD");
    let endDate = moment().format("YYYY-MM-DD");
    console.log("made it past variables");
    client.getTransactions(
        ACCESS_TOKEN,
        startDate,
        endDate,
        {
            count: 250,
            offset: 0
        },
    function(error, transactionsResponse) {
        response.json({ transactions: transactionsResponse });
        // TRANSACTIONS LOGGED BELOW! 
        // They will show up in the terminal that you are running nodemon in.
        console.log(transactionsResponse);
    });
}