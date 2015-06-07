import React, {Component, PropTypes} from 'react';
import ValidatedComponent from 'utils/ValidatedComponent.jsx'

// redux
import { connect, bindActions } from 'redux';
import packages from '../stores/packages.js';
import * as PacActions from '../actions/PacActions.js';

// page
import PackageList from '../pages/PackageList.jsx';


@connect(state => {
  return {
    packages: state.packages,
  };
})
export default class PackageListController extends ValidatedComponent {

  static propTypes = {
    dispatcher: PropTypes.object.isRequired,
    packages: PropTypes.array.isRequired
  }

  render() {
    const {packages, dispatcher} = this.props;
    const actions = bindActions(PacActions, dispatcher);

    return <PackageList packages={packages} {...actions} />;
  }

};
