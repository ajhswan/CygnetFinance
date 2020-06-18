"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("./Controllers/UserController");
function routes(app) {
    app.post('/users/register', UserController_1.registerUser);
    app.post('/users/login', UserController_1.loginUser);
}
exports.routes = routes;
module.exports = routes;
