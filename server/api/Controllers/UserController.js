"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
