import { Request, Response } from 'express';
import { validateRegisterInput } from '../Services/ValidationService'
import { createNewUser } from '../Services/UserService';

export function registerUser(request: Request, response: Response) {
    const { errors, isValid } = validateRegisterInput(request.body);

    if (!isValid) {
        return response
        .status(400)
        .json(errors);
    } else {
        return createNewUser(request, response);
    };
}