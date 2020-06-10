"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
const SALT_WORK_FACTOR = 10;
const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
UserSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password'))
        return next();
    bcryptjs_1.default.genSalt(SALT_WORK_FACTOR, function (error, salt) {
        if (error)
            return next(error);
        bcryptjs_1.default.hash(user.password, salt, function (error, hash) {
            if (error)
                return next(error);
            user.password = hash;
            next();
        });
    });
});
UserSchema.methods.comparePassword = function (userPassword, cb) {
    bcryptjs_1.default.compare(userPassword, this.passord, function (error, isMatch) {
        if (error)
            return cb(error);
        cb(null, isMatch);
    });
};
exports.User = mongoose_1.default.model('users', UserSchema);
