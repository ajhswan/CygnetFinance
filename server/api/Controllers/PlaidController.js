"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPlaidTransactions = exports.fetchPlaidAccounts = exports.deletePlaidAccount = exports.addPlaidAccount = void 0;
const PlaidService_1 = require("../Services/PlaidService");
function addPlaidAccount(request, response) {
    PlaidService_1.newAccount(request, response);
}
exports.addPlaidAccount = addPlaidAccount;
function deletePlaidAccount(request, response) {
    PlaidService_1.deleteAccount(request, response);
}
exports.deletePlaidAccount = deletePlaidAccount;
function fetchPlaidAccounts(request, response) {
    PlaidService_1.fetchAccounts(request, response);
}
exports.fetchPlaidAccounts = fetchPlaidAccounts;
function fetchPlaidTransactions(request, response) {
    PlaidService_1.fetchTransactions(request, response);
}
exports.fetchPlaidTransactions = fetchPlaidTransactions;
