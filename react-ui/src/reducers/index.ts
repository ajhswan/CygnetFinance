import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducer from './errorReducers';

export const rootReducer = combineReducers({
    auth: authReducer,
    errors: errorReducer
});