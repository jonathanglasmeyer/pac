import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

import createLogger from 'redux-logger';
const logger = createLogger();

import App from './components/App';
const store = createStore(rootReducer, applyMiddleware(thunk, logger));
import * as actionCreators from './actions';

const AppContainer = connect(
  (state) => ({
    packages: state.packages,
    status: state.status,
  }),
  actionCreators,
)(App);

const Entry = () => <Provider store={store}>
  <AppContainer />
</Provider>;

ReactDOM.render(<Entry />, document.getElementById('content'));
