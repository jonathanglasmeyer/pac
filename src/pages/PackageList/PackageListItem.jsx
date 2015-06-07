import React, {Component, PropTypes} from 'react';
import ValidatedComponent from 'utils/ValidatedComponent.jsx';

import ListItem from '../../widgets/ListItem.jsx';

const style = {
  name: {
    paddingRight: 10
  },

  description: {
    color: '#666',
    fontSize: '80%'
  }

};

export default class PackageListItem extends ValidatedComponent {

  static propTypes = {
    pack: PropTypes.object.isRequired
  }

  render() {
    const {pack} = this.props;
    console.info('[PackageListItem.jsx] ', pack);

    return <ListItem>
      <span style={[style.name]}>
        {pack['Name']}
      </span>
      <span style={[style.description]}>
         {' '} {pack['Description']}
      </span>
    </ListItem>;
  }

};
