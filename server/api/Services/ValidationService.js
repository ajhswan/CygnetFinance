"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const validator_1 = tslib_1.__importDefault(require("validator"));
const is_empty_1 = tslib_1.__importDefault(require("is-empty"));
function validateLoginInput(data) {
    let errors = {};
    data.email = !is_empty_1.default(data.email) ? data.email : "";
    data.password = !is_empty_1.default(data.password) ? data.password : "";
    if (validator_1.default.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }
    else if (!validator_1.default.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    if (validator_1.default.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    return {
        errors,
        isValid: is_empty_1.default(errors)
    };
}
exports.validateLoginInput = validateLoginInput;
function validateRegisterInput(data) {
    let errors = {};
    data.name = !is_empty_1.default(data.name) ? data.name : "";
    data.email = !is_empty_1.default(data.email) ? data.email : "";
    data.password = !is_empty_1.default(data.password) ? data.password : "";
    data.password2 = !is_empty_1.default(data.password2) ? data.password2 : "";
    if (validator_1.default.isEmpty(sanatizeData(data.name))) {
        errors.name = "Name field is required";
    }
    if (validator_1.default.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }
    else if (!validator_1.default.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    if (validator_1.default.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (validator_1.default.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }
    if (!validator_1.default.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters and no more than 30 characters";
    }
    if (!validator_1.default.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }
    return {
        errors,
        isValid: is_empty_1.default(errors)
    };
}
exports.validateRegisterInput = validateRegisterInput;
function sanatizeData(data) {
    data = data.trim();
    data = validator_1.default.escape(data);
    return data;
}
exports.sanatizeData = sanatizeData;
module.exports.validateLoginInput = validateLoginInput;
module.exports.validateRegisterInput = validateRegisterInput;
