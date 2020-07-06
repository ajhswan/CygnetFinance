"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = exports.createNewUser = void 0;
const tslib_1 = require("tslib");
const User_1 = require("../../models/User");
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
const ValidationService_1 = require("../Services/ValidationService");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const keys_1 = require("../../config/keys");
function createNewUser(request, response) {
    try {
        User_1.User.findOne({ email: request.body.email })
            .then(user => {
            if (user) {
                return response
                    .status(400)
                    .json({ email: "Email already exists" });
            }
            else {
                const newUser = new User_1.User({
                    name: ValidationService_1.sanatizeData(request.body.name),
                    email: ValidationService_1.sanatizeData(request.body.email),
                    password: ValidationService_1.sanatizeData(request.body.password)
                });
                newUser.save((error) => {
                    if (error) {
                        throw error;
                    }
                });
                return response
                    .status(200)
                    .json('New user added successfully');
            }
        });
    }
    catch (error) {
        response
            .status(500)
            .json(error);
        console.log(error);
    }
}
exports.createNewUser = createNewUser;
function authenticateUser(request, response) {
    const email = request.body.email;
    const password = request.body.password;
    User_1.User.findOne({ email })
        .then(user => {
        if (!user) {
            return response
                .status(404)
                .json({ emailnotfound: "Email not found" });
        }
        else {
            bcryptjs_1.default
                .compare(password, user.password)
                .then(isMatch => {
                if (isMatch) {
                    const payload = {
                        id: user.id,
                        name: user.name
                    };
                    const options = {
                        expiresIn: 31556926
                    };
                    const secretOrKey = keys_1.keys.secretOrKey;
                    return jsonwebtoken_1.default.sign(payload, secretOrKey, options, (error, token) => {
                        response.status(200)
                            .json({
                            success: true,
                            token: "Bearer" + token
                        });
                    });
                }
                else {
                    return response
                        .status(400)
                        .json({ passwordincorrect: "Password incorrect" });
                }
            });
            return;
        }
    });
}
exports.authenticateUser = authenticateUser;
