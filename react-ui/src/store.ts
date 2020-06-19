import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';

const initialState = {};

const middleware = [thunk];

//  (process.env.NODE_ENV !== 'production')
const devStore = createStore(
        rootReducer,
        initialState,
        compose(
        applyMiddleware(...middleware),
        (window as any).__REDUX_DEVTOOLS_EXTENSION__&&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__()
        )   
    );

const prodStore = createStore(
        rootReducer,
        initialState,
        compose(
        applyMiddleware(...middleware),
        )   
    );

const store = (process.env.NODE_ENV !== 'production') ? devStore : prodStore;

export default store;