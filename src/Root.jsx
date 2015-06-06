import React, {Component, PropTypes} from 'react';
import {createDispatcher, Provider, composeStores} from 'redux';

import * as stores from './stores/index.js';

import AppController from './controllers/AppController.jsx'

const dispatcher = createDispatcher(composeStores(stores));

export default class Root extends Component {

  render() {
    console.info('[Root.jsx] ', dispatcher);
      return <Provider dispatcher={dispatcher}>
        {() => <AppController />
        }
      </Provider>
  }

}
