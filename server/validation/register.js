"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const validator_1 = tslib_1.__importDefault(require("validator"));
const is_empty_1 = tslib_1.__importDefault(require("is-empty"));
module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.name = !is_empty_1.default(data.name) ? data.name : "";
    data.email = !is_empty_1.default(data.email) ? data.email : "";
    data.password = !is_empty_1.default(data.password) ? data.password : "";
    data.password2 = !is_empty_1.default(data.password2) ? data.password2 : "";
    if (validator_1.default.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }
    if (validator_1.default.isEmpty(data.email)) {
        errors.email = "Email fiedl is required";
    }
    else if (!validator_1.default.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    if (validator_1.default.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (validator_1.default.isEmpty(data.password2)) {
        errors.password2 = "Confirm password filed is required";
    }
    if (!validator_1.default.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters and no more the 30 characters";
    }
    if (!validator_1.default.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }
    return {
        errors,
        isValid: is_empty_1.default(errors)
    };
};
