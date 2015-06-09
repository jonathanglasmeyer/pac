import moment from 'moment';

import React, {PropTypes} from 'react';
import ValidatedComponent from 'utils/ValidatedComponent.jsx';

// redux
import {connect, bindActionCreators} from 'redux';
import * as PacActions from '../actions/PacActions.js';

// page
import {PackageListPage} from 'pages';


@connect(state => {
  return {
    packages: state.packages
  };
})
export default class PackageListController extends ValidatedComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    packages: PropTypes.array.isRequired
  }

  render() {
    const {packages, dispatch} = this.props;
    const actions = bindActionCreators(PacActions, dispatch);

    const format = 'ddd DD MMM YYYY hh:mm:ss Z';
    const packagesWithDateSorted =
      _.sortBy(packages, p => {
         const date = moment(p['Install Date'], format);
         p['Install Date'] = date;
         return date.unix();
      }).reverse();

    return <PackageListPage packages={packagesWithDateSorted} {...actions} />;
  }

}
