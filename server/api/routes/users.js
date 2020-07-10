"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const UserController_1 = require("../Controllers/UserController");
const router = express_1.default.Router();
router.post('/register', UserController_1.registerUser);
router.post('/login', UserController_1.loginUser);
router.get('/test', function (request, response) {
    response.set('Content-Type', 'application/json');
    response.json('testing tsc workes');
});
module.exports = router;
