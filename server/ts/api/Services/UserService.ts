import { Request, Response } from 'express';
import { User } from '../../models/User';
import bcrypt from 'bcryptjs';
import { sanatizeData } from '../Services/ValidationService'
import { ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
// const keys = require('../../config/keys');
import  { keys }  from '../../config/keys';

export function createNewUser (request: Request, response: Response) {
    try {
    User.findOne({ email: request.body.email})
        .then( user => { 
            if (user) {
                return response
                .status(400)
                .json({ email: "Email already exists"});
            } else {
                const newUser = new User ({
                    name: sanatizeData(request.body.name),
                    email: sanatizeData(request.body.email),
                    password: sanatizeData(request.body.password)
                });
                newUser.save((error) => {
                    if (error) {
                        throw error;
                    }
                })
                return response
                .status(200)
                .json('New user added successfully');
            } 
        });
    } catch (error) {
        response
        .status(500)
        .json(error);
        console.log(error)
    }  
}

export function authenticateUser (request: Request, response: Response) {
    const email = request.body.email;
    const password = request.body.email;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return response
                .status(404)
                .json({ emailnotfound: "Email not found"});
            } else {
                




                bcrypt
                .compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name
                        };
                        const options: jwt.SignOptions ={
                            expiresIn: 31556926
                        }
                        const secretOrKey:jwt.Secret = keys.secretOrKey;

                        return jwt.sign(payload, secretOrKey , options, (error, token) => {
                                response.status(200)
                                .json({
                                success: true,
                                token: "Bearer" + token
                            })
                        });
                    } else {
                        return response
                        .status(400)
                        .json({ passwordincorrect: "Password incorrect"});
                    }
                });
                return;
            }
        }); 
}

