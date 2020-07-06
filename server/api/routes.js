"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const tslib_1 = require("tslib");
const passport_1 = tslib_1.__importDefault(require("passport"));
const UserController_1 = require("./Controllers/UserController");
const PlaidController_1 = require("./Controllers/PlaidController");
function routes(app) {
    app.post('/users/register', UserController_1.registerUser);
    app.post('/users/login', UserController_1.loginUser);
    app.post('/accounts/add', passport_1.default.authenticate('jwt', { session: false }), PlaidController_1.addPlaidAccount);
    app.delete('/accounts/:id', passport_1.default.authenticate('jwt', { session: false }), PlaidController_1.deletePlaidAccount);
    app.get('/accounts', passport_1.default.authenticate('jwt', { session: false }), PlaidController_1.fetchPlaidAccounts);
    app.get('accounts/transactions', passport_1.default.authenticate('jwt', { session: false }), PlaidController_1.fetchPlaidTransactions);
}
exports.routes = routes;
module.exports = routes;
