import { SET_CURRENT_USER, USER_LOADING } from '../actions/types';
import isEmpty from 'is-empty';

interface authenticateAction {
    type: unknown,
    payload: unknown
}

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
};

export default function(state = initialState, action: authenticateAction) {
    switch (action.type) {
        case SET_CURRENT_USER:
        return {
            ...state,
            isAuthenticated: !isEmpty(action.payload),
            user: action.payload
        };
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        default: 
            return state;
    }
}