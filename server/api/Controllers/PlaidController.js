"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPlaidAccount = void 0;
const PlaidService_1 = require("../Services/PlaidService");
function addPlaidAccount(request, response) {
    PlaidService_1.newAccount(request, response);
}
exports.addPlaidAccount = addPlaidAccount;
