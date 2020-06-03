import validateLoginInput from '../login';

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
