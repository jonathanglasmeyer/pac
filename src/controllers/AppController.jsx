import React, {Component, PropTypes} from 'react';
import { connect, bindActions } from 'redux';
import packages from '../stores/packages.js';
import * as PacActions from '../actions/PacActions.js';

import App from '../pages/App.jsx';

@connect(state => {
  return {
    packages: state.packages,
  };
})
export default class AppController extends Component {

  render() {
    const {packages, dispatcher} = this.props;
    const actions = bindActions(PacActions, dispatcher);
    return <App {...{packages}} {...actions} />;

  }

}


