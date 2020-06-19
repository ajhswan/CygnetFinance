import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';

const initialState = {};

const middleware = [thunk];

if (process.env.NODE_ENV !== 'production'){
    const store = createStore(
        rootReducer,
        initialState,
        compose(
        applyMiddleware(...middleware),
        (window as any).__REDUX_DEVTOOLS_EXTENSION__&&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__()
        )   
    );
} else {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
        applyMiddleware(...middleware),
        )   
    );
}


export default store;