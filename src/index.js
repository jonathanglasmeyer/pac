import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

const rootEl = document.getElementById('content');

import configureStore from './store/configureStore';
const store = configureStore();

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
