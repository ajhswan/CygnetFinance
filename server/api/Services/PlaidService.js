"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlaidTransactions = exports.exchangeTokens = exports.fetchTransactions = exports.fetchAccounts = exports.deleteAccount = exports.newAccount = void 0;
const tslib_1 = require("tslib");
const plaid_1 = tslib_1.__importDefault(require("plaid"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const Account_1 = require("../../models/Account");
const PLAID_CLIENT_ID = "5eeb93a5c72d7b0013b91f98";
const PLAID_SECRET = "42fb58da0c3748d845abb2f5b0d3af";
const PLAID_PUBLIC_KEY = "3c16fb36fe08680b6ced44543c6b83";
const PLAID_ENV = "sandbox";
const client = new plaid_1.default.Client(PLAID_CLIENT_ID, PLAID_SECRET, PLAID_PUBLIC_KEY, plaid_1.default.environments[PLAID_ENV], { version: "2019-05-29" });
var ACCESS_TOKEN = null;
var PUBLIC_TOKEN = null;
var ITEM_ID = null;
function newAccount(request, response) {
    PUBLIC_TOKEN = request.body.public_token;
    const userId = request.user.id;
    const institution = request.body.metadata.institution;
    const { name, institution_id } = institution;
    console.log(client);
    if (PUBLIC_TOKEN) {
        client
            .exchangePublicToken(PUBLIC_TOKEN)
            .then(exchangeResponse => {
            ACCESS_TOKEN = exchangeResponse.access_token;
            ITEM_ID = exchangeResponse.item_id;
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
function exchangeTokens(request, response) {
    let PUBLIC_TOKEN = request.body.public_token;
    client.exchangePublicToken(PUBLIC_TOKEN, function (error, tokenResponse) {
        let ACCESS_TOKEN = tokenResponse.access_token;
        let ITEM_ID = tokenResponse.item_id;
        response.json({
            access_token: ACCESS_TOKEN,
            item_id: ITEM_ID
        });
        console.log("access token below");
        console.log(ACCESS_TOKEN);
    });
}
exports.exchangeTokens = exchangeTokens;
;
function getPlaidTransactions(request, response) {
    let startDate = moment_1.default()
        .subtract(30, "days")
        .format("YYYY-MM-DD");
    let endDate = moment_1.default().format("YYYY-MM-DD");
    console.log("made it past variables");
    client.getTransactions(ACCESS_TOKEN, startDate, endDate, {
        count: 250,
        offset: 0
    }, function (error, transactionsResponse) {
        response.json({ transactions: transactionsResponse });
        console.log(transactionsResponse);
    });
}
exports.getPlaidTransactions = getPlaidTransactions;
