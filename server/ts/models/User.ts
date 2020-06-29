import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../types';
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10

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

UserSchema.pre<IUser>('save', function(next) {
    const user = this;

    if(!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function (error, salt) {
        if (error) return next(error);
        bcrypt.hash(user.password, salt, function (error, hash) {
            if (error) return next(error);
            user.password = hash;
            next();
        });
    });
});

export const User = mongoose.model<IUser>('users', UserSchema)
// module.exports.User = User;