import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import store from '../../store';

import Login  from '../Login';

describe('Login Snapshot', () => {
    test('Login component succesfully renderered', () => {
        
        const tree = renderer.create(
        <Provider store={store}>
            <Login /> 
        </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
        })
})