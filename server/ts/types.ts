export {
    UserRegValues,
    UserRegErrorValues,
    UserLoginValues,
    UserLoginErrorValues
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