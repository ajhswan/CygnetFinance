import { validateLoginInput, validateRegisterInput }from '../ValidationService'

describe('User Registration Validation', () => {

    test('Success test', () => {
        const testDataSuccess = {
            name: 'name',
            email: 'email@domain.com',
            password: 'password',
            password2: 'password'
        }
        expect(validateRegisterInput(testDataSuccess))
        .toMatchObject({errors: {}, isValid: true})
    });

    test('Fail test - Name field required', () => {
        const testDataFailName = {
            name: '',
            email: 'email@domain.com',
            password: 'password',
            password2: 'password'
        }
        expect(validateRegisterInput(testDataFailName))
        .toMatchObject({ errors: {name: "Name field is required"}, isValid: false })
    }); 

    test('Fail test - Email field required', () => {
        const testDataFailEmailMissing = {
            name: 'name',
            email: '',
            password: 'password',
            password2: 'password'
        }
        expect(validateRegisterInput(testDataFailEmailMissing))
        .toMatchObject({ errors: {email: "Email field is required"}, isValid: false })
    }); 

    test('Fail test - Email invalid', () => {
        const testDataFailEmailInvalid = {
            name: 'name',
            email: 'name',
            password: 'password',
            password2: 'password'
        }
        expect(validateRegisterInput(testDataFailEmailInvalid))
        .toMatchObject({ errors: {email: "Email is invalid"}, isValid: false })
    });

    test('Fail test - Password field required', () => {
        const testDataFailPassword = {
            name: 'name',
            email: 'name@domain.com',
            password: '',
            password2: 'password'
        }
        expect(validateRegisterInput(testDataFailPassword))
        .toMatchObject({ errors: {password: "Password must be at least 6 characters and no more the 30 characters"}, isValid: false })
    });

    test('Fail test - Confirm password field required', () => {
        const testDataFailPassword2 = {
            name: 'name',
            email: 'name@domain.com',
            password: 'password',
            password2: ''
        }
        expect(validateRegisterInput(testDataFailPassword2))
        .toMatchObject({ errors: {password2: "Passwords must match"}, isValid: false })
    });

    test('Fail test - Password length min 6', () => {
        const testDataFailPasswordLengthMin = {
            name: 'name',
            email: 'name@domain.com',
            password: 'pass',
            password2: 'pass'
        }
        expect(validateRegisterInput(testDataFailPasswordLengthMin))
        .toMatchObject({ 
        errors: {password: "Password must be at least 6 characters and no more the 30 characters"}, isValid: false })
    });

    test('Fail test - Password length max 30', () => {
        const testDataFailPasswordLengthMax = {
            name: 'name',
            email: 'name@domain.com',
            password: 'passwordddddddddddddddddddddddd',
            password2: 'passwordddddddddddddddddddddddd'
}     
        expect(validateRegisterInput(testDataFailPasswordLengthMax))
        .toMatchObject({ 
        errors: {password: "Password must be at least 6 characters and no more the 30 characters"}, isValid: false })
    });

    test('Fail test - Password match', () => {
        const testDataFailPasswordMatch = {
            name: 'name',
            email: 'name@domain.com',
            password: 'password',
            password2: 'passwor'
        }
        expect(validateRegisterInput(testDataFailPasswordMatch))
        .toMatchObject({ 
        errors: {password2: "Passwords must match"}, isValid: false })
    });

    test('Malformed test - NameAsNumber', () => {
        const testDataMalformedName = {
            name: 123,
            email: 'name@domain.com',
            password: 'password',
            password2: 'password'
        }        
        expect(() => { validateRegisterInput(testDataMalformedName as any); })
        .toThrow(TypeError);
    });

    test('Malformed test - NameAsNumberString', () => {
        const testDataMaformedNameString = {
            name: '123',
            email: 'name@domain.com',
            password: 'password',
            password2: 'password'
}
        expect(validateRegisterInput(testDataMaformedNameString))
        .toMatchObject({errors: {}, isValid: true})
    });
});

describe('User Login Validation', () => {
    test('Succes test', () => {
        const testDataSuccess = {
            email: 'name@domain.com',
            password: 'password'
        }
        expect(validateLoginInput(testDataSuccess))
        .toMatchObject({errors: {}, isValid: true})
    });

    test('Fail test - Email field required', () => {
        const testDataFailEmail = {
            email: '',
            password: 'password'
        }
        expect(validateLoginInput(testDataFailEmail))
        .toMatchObject({errors: {email: "Email field is required"}, isValid: false})
    })

    test('Fail test - Email invalid', () => {
        const testDataFailEmailInvalid = {
            email: 'name.com',
            password: 'password'
        }
        expect(validateLoginInput(testDataFailEmailInvalid))
        .toMatchObject({errors: {email: "Email is invalid"}, isValid: false})
    })

    test('Fail test - Password field required', () => {
        const testDataFailPassword = {
            email: 'name.com',
            password: ''
        }
        expect(validateLoginInput(testDataFailPassword))
        .toMatchObject({errors: {password: "Password field is required"}, isValid: false})
    })

    test('Fail test - Malformed name', () => {
        const testDataFailNameAsNumber = {
            email: 123,
            password: 'password'
        }
        expect(() => {validateLoginInput(testDataFailNameAsNumber as any); })
        .toThrow(TypeError);
    })

    test('Fail test - Malformed password', () => {
        const testDataFailPasswordAsNumber = {
            email: 'name',
            password: 123
        }
        expect(() => {validateLoginInput(testDataFailPasswordAsNumber as any); })
        .toThrow(TypeError);
    })

});
