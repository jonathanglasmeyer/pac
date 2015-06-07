import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import ValidatedComponent from 'utils/ValidatedComponent.jsx';

import {Checkbox, Dialog} from 'material-ui';

import {ListItem, Body, Subhead} from '../../widgets/index.js';

const style = {

  date: {
    color: '#777',
    fontSize: '80%'
  },

  description: {
    color: '#444',
    fontSize: '80%'
  }

};

@Radium.Enhancer
export default class PackageListItem extends ValidatedComponent {

  static propTypes = {
    pack: PropTypes.object.isRequired,
    uninstall: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired, // for parent
  }

  render() {
    const {pack, onClick} = this.props;
    const dateInstalledRelative = pack['Install Date'].fromNow();


    return <ListItem
      onClick={() => onClick(pack)}>


      <div>
        <Subhead>{pack['Name']}</Subhead>
        <Body secondary>
          {' '}({dateInstalledRelative})
        </Body>
      </div>

      <Body secondary>
       {' '} {pack['Description']}
      </Body>
    </ListItem>;
  }

};
