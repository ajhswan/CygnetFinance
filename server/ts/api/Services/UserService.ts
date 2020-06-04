import { Request, Response } from 'express';
// const User = require('../../models/User');
import { User } from '../../models/User';
import bcrypt from 'bcryptjs';

export function createNewUser (request: Request, response: Response) {
    User.findOne({ email: request.body.email})
        .then( user => { 
            if (user) {
                return response
                .status(400)
                .json({ email: "Email already exists"});
            } else {
                const newUser = new User ({
                    name: request.body.name,
                    email: request.body.email,
                    password: request.body.password
                });
                bcrypt.genSalt(10, (error, salt) => {
                    bcrypt.hash(newUser.password, salt, (error, hash) => {
                        if (error){ 
                            throw response
                            .status(500)
                            .json(error);
                        };
                        newUser.password = hash;
                        newUser
                        .save()
                        .then(user =>  response.json(user))
                        .catch(error => console.log(error));
                    })
                });
                return response
                .status(200)
                .json('New user added succesfully');
            } 
        });
}
