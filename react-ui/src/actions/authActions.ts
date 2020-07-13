import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types';

export const registerUser = (userData: any, history: any ) => (dispatch: any) => {
    axios
        .post('api/users/register', userData)
        .then(response => history.push('/login'))
        .catch(error =>
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data
            })
        );
    };

export const loginUser = (userData: any) => (dispatch: any) => {
    axios
    .post('api/users/login', userData)
    .then(response => {
        const { token } = response.data;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
    })
    .catch(error => 
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    );
}

export const setCurrentUser = (decoded: any) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
}

export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
}

export const logoutUser = () => (dispatch: any) => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}