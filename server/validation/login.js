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
exports.default = validateLoginInput;
module.exports.validateLoginInput = validateLoginInput;
