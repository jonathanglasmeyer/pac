import moment from 'moment';

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

    const format = 'ddd DD MMM YYYY hh:mm:ss Z'
    const packagesWithDateSorted =
      _.sortBy(packages, p => {
         const date = moment(p['Install Date'], format);
         p['Install Date'] = date;
         return date.unix();
      }).reverse();
    // console.info('[PackageListController.jsx] ', packagesSorted);
    // console.info('[PackageListController.jsx] ', moment(date, format).unix());


    return <PackageList packages={packagesWithDateSorted} {...actions} />;
  }

};
