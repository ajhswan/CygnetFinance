import Validator from 'validator';
import isEmpty from 'is-empty';

interface UserLoginValues {
    email: string,
    password: string
}

interface UserLoginErrorValues {
    email?: string,
    password?: string
}

export default function validateLoginInput(data: UserLoginValues ) {
    let errors: UserLoginErrorValues = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}

module.exports.validateLoginInput = validateLoginInput