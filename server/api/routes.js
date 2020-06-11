"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RemainingController_1 = require("./Controllers/RemainingController");
const UserController_1 = require("./Controllers/UserController");
function routes(app) {
    app.get('/', (request, response) => response.send('success'));
    app.get('*', RemainingController_1.setRemainingRoutes);
    app.post('/user/register', UserController_1.registerUser);
    app.post('/user/login', UserController_1.loginUser);
}
exports.routes = routes;
module.exports = routes;
