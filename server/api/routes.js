"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const RemainingController_1 = require("./Controllers/RemainingController");
const UserController_1 = require("./Controllers/UserController");
function routes(app) {
    const router = express_1.default.Router();
    router.get('/', (request, response) => response.send('success'));
    router.get('*', RemainingController_1.setRemainingRoutes);
    router.post('/register', UserController_1.registerUser);
    router.post('/login', UserController_1.loginUser);
}
module.exports = routes;
