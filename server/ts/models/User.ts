import mongoose = require('mongoose');
import Schema = mongoose.Schema;
import { IUser } from '../types';

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

export const User = mongoose.model<IUser>('users', UserSchema)
// module.exports.User = User;