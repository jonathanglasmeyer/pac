import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'

import {Notification} from 'react-notification'

import * as appActions from './AppActions'
import PackageList from '../domains/package/PackageList'
import Page from './Page'

const notificationStyle = (type) => ({
  bar: {
    background: type === 'error' ? '#CD5555' : '#2ecc71',
    borderRadius: '1px',
    fontSize: '14px',
    marginRight: 20,
    marginBottom: -20,
  },
})

const StatusNotification = ({status, onDismiss}) => <Notification
  isActive={!!status}
  message={status ? status.text : ''}
  style={status ? notificationStyle(status.type) : {}}
  dismissAfter={5000}
  onDismiss={onDismiss}
/>

export class App extends Component {
  static propTypes = {
    app: PropTypes.object,

    // For resetting status when clicking notification bar
    setStatus: PropTypes.func.isRequired,
  };

  render() {
    const {app} = this.props
    return <Page>
      <PackageList />
      <StatusNotification onDismiss={this.resetStatus} status={app.status} />
    </Page>
  }

  resetStatus = () => {
    this.props.setStatus(null)
  }
}

export default connect(
  (state) => ({
    app: state.app,
  }),
  appActions,
)(App)
