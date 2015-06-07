import React, {Component, PropTypes} from 'react';
import ValidatedComponent from 'utils/ValidatedComponent.jsx'

import PackageListController from './controllers/PackageListController.jsx';

export default class App extends ValidatedComponent {

  static propTypes = {

  }

  // componentDidMount() {
  //   this.props.loadPackages();
  // }

  render() {
    // const {packages, loadPackages, uninstall} = this.props;
    return <PackageListController />;
  }

  // onPackageClick() {
  //   this.props.uninstall('foo');
  // }

}
