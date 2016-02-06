import React, {Component, PropTypes} from 'react';
import PackageList from './PackageList';
import {Page} from './widgets';
import Notification from 'react-notification';

const notificationStyle = (type) => ({
  bar: {
    background: type === 'error' ? '#CD5555' : '#2ecc71',
    borderRadius: '1px',
    fontSize: '14px',
    marginRight: 20,
    marginBottom: -20,
    // top: 20,
  },
  // active: {
  //   left: '3rem',
  // },
});

export default class App extends Component {
  static propTypes = {
    packages: PropTypes.array,
    status: PropTypes.object,

    loadPackages: PropTypes.func,
    uninstall: PropTypes.func,
    setStatus: PropTypes.func,
  };

  componentDidMount() {
    this.props.loadPackages();
  }

  render() {
    const {packages, status} = this.props;
    return <Page>
      <Notification
        isActive={!!status}
        message={status ? status.text : ''}
        style={status ? notificationStyle(status.type) : {}}
        dismissAfter={5000}
        onDismiss={::this._handleResetStatus}
      />
      <PackageList packages={packages} onUninstall={::this._handleUninstall} />
    </Page>;
  }

  _handleUninstall(pacName) {
    const yes = window.confirm(`Uninstall ${pacName}?`); // eslint-disable-line no-alert
    if (yes) {
      this.props.uninstall(pacName);
    }
  }

  _handleResetStatus() {
    this.props.setStatus(null);
  }
}
