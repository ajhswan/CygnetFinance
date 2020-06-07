"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const login_1 = tslib_1.__importDefault(require("../login"));
describe('User Login Validation', () => {
    test('Succes test', () => {
        const testDataSuccess = {
            email: 'name@domain.com',
            password: 'password'
        };
        expect(login_1.default(testDataSuccess))
            .toMatchObject({ errors: {}, isValid: true });
    });
    test('Fail test - Email field required', () => {
        const testDataFailEmail = {
            email: '',
            password: 'password'
        };
        expect(login_1.default(testDataFailEmail))
            .toMatchObject({ errors: { email: "Email field is required" }, isValid: false });
    });
    test('Fail test - Email invalid', () => {
        const testDataFailEmailInvalid = {
            email: 'name.com',
            password: 'password'
        };
        expect(login_1.default(testDataFailEmailInvalid))
            .toMatchObject({ errors: { email: "Email is invalid" }, isValid: false });
    });
    test('Fail test - Password field required', () => {
        const testDataFailPassword = {
            email: 'name.com',
            password: ''
        };
        expect(login_1.default(testDataFailPassword))
            .toMatchObject({ errors: { password: "Password field is required" }, isValid: false });
    });
    test('Fail test - Malformed name', () => {
        const testDataFailNameAsNumber = {
            email: 123,
            password: 'password'
        };
        expect(() => { login_1.default(testDataFailNameAsNumber); })
            .toThrow(TypeError);
    });
    test('Fail test - Malformed password', () => {
        const testDataFailPasswordAsNumber = {
            email: 'name',
            password: 123
        };
        expect(() => { login_1.default(testDataFailPasswordAsNumber); })
            .toThrow(TypeError);
    });
});
