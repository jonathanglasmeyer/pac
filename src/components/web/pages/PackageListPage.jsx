import React, {PropTypes} from 'react';
import ValidatedComponent from 'utils/ValidatedComponent.jsx';

import {List} from 'widgets';
import {PackageListItem} from 'pages/PackageListPage';
import {LoadingPage} from 'pages';

import {Dialog} from 'material-ui';

export default class PackageList extends ValidatedComponent {

  constructor(props) {
    super(props);
    this.state = {
      uninstallPackage: {}
    }
  }

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
    const standardActions = [
      { text: 'Cancel' },
      { text: 'Uninstall', onClick: this.onDialogSubmit, ref: 'submit' }
    ];
    const {uninstallPackage} = this.state;

    return packages.length > 0 ?
      <List>

        <Dialog
          title={`Uninstall`}
          ref='dialog'
          actions={standardActions}
          actionFocus="submit"
          modal={true}>
          {`Do you want to uninstall ${uninstallPackage.Name}?`}
        </Dialog>

        {packages.map((pack,i) =>
          <PackageListItem
            onClick={::this.onItemClick}
            key={i}
            {...{uninstall, pack}} />
        )}
      </List>
    : <LoadingPage />;
  }

  onItemClick(pack) {
    this.setState({uninstallPackage: pack});
    this.refs.dialog.show();
  }


};
