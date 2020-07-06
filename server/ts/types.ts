import { Document } from 'mongoose';
import { Request } from 'express';

export {
    UserRegValues,
    UserRegErrorValues,
    UserLoginValues,
    UserLoginErrorValues,
    IUser,
    IRequest
}

    interface UserRegValues {
        name: string,
        email: string,
        password: string,
        password2: string
    }

    interface UserRegErrorValues {
        name? : string,
        email? : string,
        password? : string,
        password2? : string
    }

    interface UserLoginValues {
        email: string,
        password: string
    }

    interface UserLoginErrorValues {
        email?: string,
        password?: string
    }

    interface IUser extends Document {
        name: string,
        email: string,
        password: string
    }

    interface IRequest extends Request {
        user?: any
    }