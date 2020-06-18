"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const keys_1 = require("./keys");
const User = mongoose_1.default.model('users');
const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
const secretOrKey = keys_1.keys.secretOrKey;
const options = {
    jwtFromRequest,
    secretOrKey
};
module.exports = (passport) => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        })
            .catch(error => console.log(error));
    }));
};