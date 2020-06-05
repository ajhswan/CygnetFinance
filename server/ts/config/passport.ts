import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import mongoose from 'mongoose';

const keys = require('./keys');


const User = mongoose.model('users');
const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
const secretOrKey: string = keys.secretOrKey
const options = {
    jwtFromRequest,
    secretOrKey
}

module.exports = (passport: any) => {
    passport.use(
        new JwtStrategy(options, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(error => console.log(error));
        })
    );
}