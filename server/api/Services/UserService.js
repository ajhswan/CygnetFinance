"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const User_1 = require("../../models/User");
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
function createNewUser(request, response) {
    User_1.User.findOne({ email: request.body.email })
        .then(user => {
        if (user) {
            return response
                .status(400)
                .json({ email: "Email already exists" });
        }
        else {
            const newUser = new User_1.User({
                name: request.body.name,
                email: request.body.email,
                password: request.body.password
            });
            bcryptjs_1.default.genSalt(10, (error, salt) => {
                bcryptjs_1.default.hash(newUser.password, salt, (error, hash) => {
                    if (error) {
                        throw response
                            .status(500)
                            .json(error);
                    }
                    ;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => response.json(user))
                        .catch(error => console.log(error));
                });
            });
            return response
                .status(200)
                .json('New user added succesfully');
        }
    });
}
exports.createNewUser = createNewUser;
