import React, {Component, PropTypes} from 'react';
import ValidatedComponent from 'utils/ValidatedComponent.jsx';

// widgets
import List from '../widgets/List.jsx';
import PackageListItem from './PackageList/PackageListItem.jsx';


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
    const {packages} = this.props;

    return <List>
      {packages.map(pack =>
        <PackageListItem
          pack={pack} />
      )}
    </List>;
    // {packages.map(p => <li key={p['Name']} onClick={::this.onPackageClick}>
    //   <span className='package-name'>
    //     {p['Name']}
    //   </span>
    //   <span className='description'>
    //     {p['Description']}
    //   </span>
    // </li>)}
    // </ul>;
  }

};
