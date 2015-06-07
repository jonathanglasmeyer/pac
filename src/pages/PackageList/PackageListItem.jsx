import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import ValidatedComponent from 'utils/ValidatedComponent.jsx';

import ListItem from '../../widgets/ListItem.jsx';

const style = {

  base: {
    cursor: 'default',
    borderBottom: '1px solid rgba(0,0,0,0.08)',
    marginBottom: 5,
    marginTop: 5
      
  },

  date: {
    color: '#777',
    fontSize: '80%'
  },

  name: {
    paddingRight: 5,
    ':hover': {
      color: '#00796B'
    }
  },

  description: {
    color: '#444',
    fontSize: '80%'
  }

};

export default class PackageListItem extends ValidatedComponent {

  static propTypes = {
    pack: PropTypes.object.isRequired
  }

  render() {
    const {pack} = this.props;
    const dateInstalledRelative = pack['Install Date'].fromNow();

    return <ListItem style={[style.base]} onClick={::this.onClick}>
      <span style={[style.name]}>
        {pack['Name']}
      </span>
      <span style={[style.date]}>
        {' '}{dateInstalledRelative}
      </span>
      <p style={[style.description]}>
         {' '} {pack['Description']}
      </p>
    </ListItem>;
  }

  onClick() {
    console.info('[PackageListItem.jsx] ', this.props.pack);
  }

};
