import React, {Component, PropTypes} from 'react';
import { connect, bindActions } from 'redux';
import packages from '../stores/packages.js';
import * as PacActions from '../actions/PacActions.js';
import * as CounterActions from '../actions/CounterActions.js';

import App from '../pages/App.jsx';

@connect(state => {
  return {
    packages: state.packages,
    counter: state.counter
  };
})
export default class AppController extends Component {

  render() {
    // exec('pacman -Qe', print);
    const {packages, dispatcher} = this.props;
    const actions = bindActions(PacActions, dispatcher);
    return <App {...{packages}} {...actions} />;

  }

}


