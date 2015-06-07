import React, {Component, PropTypes} from 'react';
import { connect, bindActions } from 'redux';

import App from '../App.jsx';

export default class AppController extends Component {

  render() {
    const {packages, dispatcher} = this.props;
    const actions = bindActions(PacActions, dispatcher);
    return <App {...{packages}} {...actions} />;

  }

}


