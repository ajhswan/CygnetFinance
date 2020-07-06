"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const ValidationService_1 = require("../Services/ValidationService");
const UserService_1 = require("../Services/UserService");
function registerUser(request, response) {
    const { errors, isValid } = ValidationService_1.validateRegisterInput(request.body);
    if (!isValid) {
        return response
            .status(400)
            .json(errors);
    }
    else {
        return UserService_1.createNewUser(request, response);
    }
    ;
}
exports.registerUser = registerUser;
function loginUser(request, response) {
    const { errors, isValid } = ValidationService_1.validateLoginInput(request.body);
    if (!isValid) {
        return response
            .status(400)
            .json(errors);
    }
    else {
        return UserService_1.authenticateUser(request, response);
    }
}
exports.loginUser = loginUser;
