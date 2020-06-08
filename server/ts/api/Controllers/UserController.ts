import { Request, Response } from 'express';
import { validateRegisterInput, validateLoginInput } from '../Services/ValidationService'
import { createNewUser, authenticateUser } from '../Services/UserService';

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

export function loginUser(request: Request, response: Response) {
    const { errors, isValid } = validateLoginInput(request.body);
    if (!isValid) {
        return response
        .status(400)
        .json(errors)
    } else {
        return authenticateUser(request, response);
    }
}