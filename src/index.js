import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

const logger = createLogger({
  predicate: (_, action) => !action.type.includes('EFFECT_'),
  collapsed: () => true,
});

import * as sagas from './sagas';
const sagaMiddleware = createSagaMiddleware(
  ...Object.values(sagas),
);

const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware, logger));

const rootEl = document.getElementById('content');

let render = () => {
  const App = require('./App/App').default;
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootEl,
  );
};

if (module.hot) {
  // Support hot reloading of components
  // and display an overlay for runtime errors
  const renderApp = render;
  const renderError = (error) => {
    const RedBox = require('redbox-react');
    ReactDOM.render(
      <RedBox error={error} />,
      rootEl
    );
  };
  render = () => {
    try {
      renderApp();
    } catch (error) {
      renderError(error);
    }
  };

  module.hot.accept('./App/App', () => {
    setTimeout(render);
  });
}

render();
