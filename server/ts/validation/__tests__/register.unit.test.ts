const validateRegisterInput = require('../register').validateRegisterInput;

const testDataSuccess = {
    name: 'name',
    email: 'email@domain.com',
    password: 'password',
    password2: 'password'
}

const testDataFailName = {
    name: '',
    email: 'email@domain.com',
    password: 'password',
    password2: 'password'
}

const testDataFailEmailMissing = {
    name: 'name',
    email: '',
    password: 'password',
    password2: 'password'
}

const testDataFailEmailInvalid = {
    name: 'name',
    email: 'name',
    password: 'password',
    password2: 'password'
}

const testDataFailPassword = {
    name: 'name',
    email: 'name@domain.com',
    password: '',
    password2: 'password'
}

const testDataFailPassword2 = {
    name: 'name',
    email: 'name@domain.com',
    password: 'password',
    password2: ''
}

const testDataFailPasswordLengthMin = {
    name: 'name',
    email: 'name@domain.com',
    password: 'pass',
    password2: 'pass'
}

const testDataFailPasswordLengthMax = {
    name: 'name',
    email: 'name@domain.com',
    password: 'passwordddddddddddddddddddddddd',
    password2: 'passwordddddddddddddddddddddddd'
}

const testDataFailPasswordMatch = {
    name: 'name',
    email: 'name@domain.com',
    password: 'password',
    password2: 'passwor'
}

const testDataMaformedName = {
    name: 123,
    email: 'name@domain.com',
    password: 'password',
    password2: 'password'
}

const testDataMaformedNameString = {
    name: '123',
    email: 'name@domain.com',
    password: 'password',
    password2: 'password'
}

test('Success test', () => {
    expect(validateRegisterInput(testDataSuccess))
    .toMatchObject({"errors": {}, "isValid": true})
})

test('Fail test - Name field required', () => {
    expect(validateRegisterInput(testDataFailName))
    .toMatchObject({ errors: {"name": "Name field is required"}, "isValid": false })
}) 

test('Fail test - Email field required', () => {
    expect(validateRegisterInput(testDataFailEmailMissing))
    .toMatchObject({ errors: {"email": "Email field is required"}, "isValid": false })
}) 

test('Fail test - Email invalid', () => {
    expect(validateRegisterInput(testDataFailEmailInvalid))
    .toMatchObject({ errors: {"email": "Email is invalid"}, "isValid": false })
})

test('Fail test - Password field required', () => {
    expect(validateRegisterInput(testDataFailPassword))
    .toMatchObject({ errors: {"password": "Password must be at least 6 characters and no more the 30 characters"}, "isValid": false })
})

test('Fail test - Confirm password field required', () => {
    expect(validateRegisterInput(testDataFailPassword2))
    .toMatchObject({ errors: {"password2": "Passwords must match"}, "isValid": false })
})

test('Fail test - Password length min 6', () => {
    expect(validateRegisterInput(testDataFailPasswordLengthMin))
    .toMatchObject({ 
    errors: {"password": "Password must be at least 6 characters and no more the 30 characters"}, "isValid": false })
})

test('Fail test - Password length max 30', () => {
    expect(validateRegisterInput(testDataFailPasswordLengthMax))
    .toMatchObject({ 
    errors: {"password": "Password must be at least 6 characters and no more the 30 characters"}, "isValid": false })
})

test('Fail test - Password match', () => {
    expect(validateRegisterInput(testDataFailPasswordMatch))
    .toMatchObject({ 
    errors: {"password2": "Passwords must match"}, "isValid": false })
})

test('Malformed test - NameAsNumber', () => {
    expect(() => { validateRegisterInput(testDataMaformedName); })
    .toThrow(TypeError);
})

test('Malformed test - NameAsNumberString', () => {
    expect(validateRegisterInput(testDataMaformedNameString))
    .toMatchObject({"errors": {}, "isValid": true})
})


