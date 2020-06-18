"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const UserController_1 = require("./Controllers/UserController");
function routes(app) {
    app.get('/', (request, response) => response.send('success'));
    app.get('*', (request, response) => response.sendFile(path_1.default.resolve(__dirname, '../react-ui/build', 'index.html')));
    app.post('/users/register', UserController_1.registerUser);
    app.post('/users/login', UserController_1.loginUser);
}
exports.routes = routes;
module.exports = routes;
