import {createStore, applyMiddleware, combineReducers} from 'redux'

import {sagaMiddleware} from '../../src/store/configureStore'
export default (reducer) => createStore(reducer, {}, applyMiddleware(sagaMiddleware))
