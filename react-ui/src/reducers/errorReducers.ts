import { GET_ERRORS } from '../actions/types';

interface errorActions {
    type: any,
    payload: any
} 

const initailState = {};

export default function(state = initailState, action: errorActions ) {
    switch (action.type) {
        case GET_ERRORS:
            return action.payload;
        default:
            return state;
    }
}