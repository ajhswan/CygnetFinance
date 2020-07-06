"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchTransactions = exports.fetchAccounts = exports.deleteAccount = exports.newAccount = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const plaid_1 = tslib_1.__importDefault(require("plaid"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const router = express_1.default.Router();
const Account_1 = require("../../models/Account");
const PLAID_CLIENT_ID = '';
const PLAID_SECRET = '';
const PLAID_PUBLIC_KEY = '';
const client = new plaid_1.default.Client(PLAID_CLIENT_ID, PLAID_SECRET, PLAID_PUBLIC_KEY, plaid_1.default.environments.development, { version: '2019-05-29' });
function newAccount(request, response) {
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
            Account_1.Account.findOne({
                userId: request.user.id,
                institutionId: institution_id
            })
                .then(account => {
                if (account) {
                    console.log('Account already exists');
                }
                else {
                    const newAccount = new Account_1.Account({
                        userId: userId,
                        accessToken: ACCESS_TOKEN,
                        itemID: ITEM_ID,
                        institutionId: institution_id,
                        institutionName: name
                    });
                    newAccount.save().then(account => response.json(account));
                }
            })
                .catch(error => console.log('Mongo Error', error));
        })
            .catch(error => console.log('Plaid Error', error));
    }
}
exports.newAccount = newAccount;
function deleteAccount(request, response) {
    Account_1.Account.findById(request.params.id)
        .then(account => {
        account === null || account === void 0 ? void 0 : account.remove().then(() => response.json({ success: true }));
    })
        .catch(error => console.log(error));
}
exports.deleteAccount = deleteAccount;
function fetchAccounts(request, response) {
    Account_1.Account.find({ userId: request.user.id })
        .then(accounts => response.json(accounts))
        .catch(error => console.log(error));
}
exports.fetchAccounts = fetchAccounts;
function fetchTransactions(request, response) {
    const now = moment_1.default();
    const today = now.format('YYYY-MM-DD');
    const thirtyDaysAgo = now.subtract(30, 'days').format('YYY-MM-DD');
    let transactions = [];
    const accounts = request.body;
    if (accounts) {
        accounts.forEach(function (account) {
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
exports.fetchTransactions = fetchTransactions;
