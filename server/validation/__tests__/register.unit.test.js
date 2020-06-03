"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const register_1 = tslib_1.__importDefault(require("../register"));
describe('User Registration Validation', () => {
    test('Success test', () => {
        const testDataSuccess = {
            name: 'name',
            email: 'email@domain.com',
            password: 'password',
            password2: 'password'
        };
        expect(register_1.default(testDataSuccess))
            .toMatchObject({ errors: {}, isValid: true });
    });
    test('Fail test - Name field required', () => {
        const testDataFailName = {
            name: '',
            email: 'email@domain.com',
            password: 'password',
            password2: 'password'
        };
        expect(register_1.default(testDataFailName))
            .toMatchObject({ errors: { name: "Name field is required" }, isValid: false });
    });
    test('Fail test - Email field required', () => {
        const testDataFailEmailMissing = {
            name: 'name',
            email: '',
            password: 'password',
            password2: 'password'
        };
        expect(register_1.default(testDataFailEmailMissing))
            .toMatchObject({ errors: { email: "Email field is required" }, isValid: false });
    });
    test('Fail test - Email invalid', () => {
        const testDataFailEmailInvalid = {
            name: 'name',
            email: 'name',
            password: 'password',
            password2: 'password'
        };
        expect(register_1.default(testDataFailEmailInvalid))
            .toMatchObject({ errors: { email: "Email is invalid" }, isValid: false });
    });
    test('Fail test - Password field required', () => {
        const testDataFailPassword = {
            name: 'name',
            email: 'name@domain.com',
            password: '',
            password2: 'password'
        };
        expect(register_1.default(testDataFailPassword))
            .toMatchObject({ errors: { password: "Password must be at least 6 characters and no more the 30 characters" }, isValid: false });
    });
    test('Fail test - Confirm password field required', () => {
        const testDataFailPassword2 = {
            name: 'name',
            email: 'name@domain.com',
            password: 'password',
            password2: ''
        };
        expect(register_1.default(testDataFailPassword2))
            .toMatchObject({ errors: { password2: "Passwords must match" }, isValid: false });
    });
    test('Fail test - Password length min 6', () => {
        const testDataFailPasswordLengthMin = {
            name: 'name',
            email: 'name@domain.com',
            password: 'pass',
            password2: 'pass'
        };
        expect(register_1.default(testDataFailPasswordLengthMin))
            .toMatchObject({
            errors: { password: "Password must be at least 6 characters and no more the 30 characters" }, isValid: false
        });
    });
    test('Fail test - Password length max 30', () => {
        const testDataFailPasswordLengthMax = {
            name: 'name',
            email: 'name@domain.com',
            password: 'passwordddddddddddddddddddddddd',
            password2: 'passwordddddddddddddddddddddddd'
        };
        expect(register_1.default(testDataFailPasswordLengthMax))
            .toMatchObject({
            errors: { password: "Password must be at least 6 characters and no more the 30 characters" }, isValid: false
        });
    });
    test('Fail test - Password match', () => {
        const testDataFailPasswordMatch = {
            name: 'name',
            email: 'name@domain.com',
            password: 'password',
            password2: 'passwor'
        };
        expect(register_1.default(testDataFailPasswordMatch))
            .toMatchObject({
            errors: { password2: "Passwords must match" }, isValid: false
        });
    });
    test('Malformed test - NameAsNumber', () => {
        const testDataMalformedName = {
            name: 123,
            email: 'name@domain.com',
            password: 'password',
            password2: 'password'
        };
        expect(() => { register_1.default(testDataMalformedName); })
            .toThrow(TypeError);
    });
    test('Malformed test - NameAsNumberString', () => {
        const testDataMaformedNameString = {
            name: '123',
            email: 'name@domain.com',
            password: 'password',
            password2: 'password'
        };
        expect(register_1.default(testDataMaformedNameString))
            .toMatchObject({ errors: {}, isValid: true });
    });
});
