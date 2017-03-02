import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import promise from 'redux-promise';
import logger from 'redux-logger'

import rootReducer from '../reducers/index';

let createStoreWithMiddleware;

if (process.env.NODE_ENV == 'production') {
    createStoreWithMiddleware = applyMiddleware(thunkMiddleware, promise)(createStore);
} else {
    createStoreWithMiddleware = applyMiddleware(thunkMiddleware, promise, logger())(createStore);
}

export default function configureStore(initialState) {
    return createStoreWithMiddleware(rootReducer, initialState);
}
