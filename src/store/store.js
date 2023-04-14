import {applyMiddleware, compose, createStore} from "redux";
import {logger} from "redux-logger/src";
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {rootReducer} from "./root-reducer";

const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(Boolean);

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancer = (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSTION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);