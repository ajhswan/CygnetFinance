"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
var Schema = mongoose.Schema;
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
module.exports.User = mongoose.model('users', UserSchema);
