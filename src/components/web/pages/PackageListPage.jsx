import React, {PropTypes} from 'react';
import ValidatedComponent from 'utils/ValidatedComponent.jsx';

import {List} from 'widgets';
import {PackageListItem} from 'pages/PackageListPage';
import {LoadingPage} from 'pages';

import {Dialog, Snackbar} from 'material-ui';

export default class PackageList extends ValidatedComponent {

  constructor(props) {
    super(props);
    this.state = {
      uninstallPackage: {}
    };
  }

  static propTypes = {
    packages: PropTypes.array.isRequired,
    loadPackages: PropTypes.func.isRequired,
    uninstall: PropTypes.func.isRequired

  }

  componentDidMount() {
    this.props.loadPackages();
  }

  render() {
    const {packages, uninstall} = this.props;

    const standardActions = [
      { text: 'Cancel' },
      { text: 'Uninstall', onClick: ::this.onDialogSubmit, ref: 'submit' }
    ];

    const {uninstallPackage} = this.state;

    return packages.length > 0 ?
      <List>

        {/* Dialog and Snackbar are normally hidden.
            It's kinda strange to put it here,
            but makes the whole thing less complex. (compared to putting
            it somewhere upstream and interacting with it via flux) */}
        <Dialog
          ref='dialog'
          title={`Uninstall`}
          actions={standardActions}
          actionFocus="submit">
          {`Do you want to uninstall ${uninstallPackage.Name}?`}
        </Dialog>

        <Snackbar
          ref='snackbar'
          message={`Uninstalled ${uninstallPackage.Name}.`} />

        {packages.map((pack, i) =>
          <PackageListItem
            key={i}
            onClick={::this.onItemClick}
            {...{uninstall, pack}} />
        )}
      </List>
    : <LoadingPage />;
  }

  onItemClick(pack) {
    // quite ugly way of supplying the clicked package to the dialog.
    this.setState({uninstallPackage: pack});

    this.refs.dialog.show();
  }

  onDialogSubmit() {
    this.refs.dialog.dismiss();
    this.refs.snackbar.show();
    this.props.uninstall(this.state.uninstallPackage);
    console.info('[PackageListPage.jsx] ', this.props);
  }


}
