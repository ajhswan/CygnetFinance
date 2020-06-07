import { Document } from 'mongoose';

export {
    UserRegValues,
    UserRegErrorValues,
    UserLoginValues,
    UserLoginErrorValues,
    IUser
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