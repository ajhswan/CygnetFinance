// import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
import mongoose from 'mongoose';
import { keys } from './keys';
// const keys = require('./keys');


const User = mongoose.model('users');
const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
const secretOrKey: string = keys.secretOrKey
const options = {
    jwtFromRequest,
    secretOrKey
}

module.exports = (passport: any) => {
    passport.use(
        new JwtStrategy(options, (jwt_payload: any, done: any) => {
            User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }       
            })
            .catch(error => done(error, null));
        })
    );
}