import React, {Component, PropTypes} from 'react';
import ValidatedComponent from 'utils/ValidatedComponent.jsx'

import PackageListController from './controllers/PackageListController.jsx';

import {RaisedButton} from 'material-ui';
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = mui.Styles.Colors;

export default class App extends ValidatedComponent {

  static childContextTypes = {muiTheme: React.PropTypes.object}

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  componentWillMount() {
    ThemeManager.setPalette({
      primary1Color: Colors.indigo500,
      accent1Color: Colors.deepOrange500
    });
  }

  render() {
    return <PackageListController />;
  }
}
