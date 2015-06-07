import React, {Component, PropTypes} from 'react';
import ValidatedComponent from 'utils/ValidatedComponent.jsx';

// widgets
import List from '../widgets/List.jsx';
import PackageListItem from './PackageList/PackageListItem.jsx';
import LoadingPage from './LoadingPage.jsx';


export default class PackageList extends ValidatedComponent {

  static propTypes = {
    packages: PropTypes.array.isRequired,
    loadPackages: PropTypes.func.isRequired,
    uninstall: PropTypes.func.isRequired,

  }

  componentDidMount() {
    this.props.loadPackages();
  }

  render() {
    const {packages, uninstall} = this.props;
    console.info('[PackageList.jsx packages] ', this.props);

    return packages.length > 0 ?
      <List>
        {packages.map((pack,i) =>
          <PackageListItem
            key={i}
            {...{uninstall, pack}} />
        )}
      </List>
    : <LoadingPage />;
  }

};
