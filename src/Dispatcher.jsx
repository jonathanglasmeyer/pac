import React, {Component} from 'react';
import {createRedux, Provider} from 'redux';

import * as stores from './stores/index.js';

import App from './App.jsx';

const redux = createRedux(stores);

export default class Dispatcher extends Component {

  render() {
    return <Provider redux={redux}>
      {() => <App /> }
    </Provider>;
  }

}
