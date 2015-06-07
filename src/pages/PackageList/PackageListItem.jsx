import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import ValidatedComponent from 'utils/ValidatedComponent.jsx';


import ListItem from '../../widgets/ListItem.jsx';

const style = {

  date: {
    color: '#777',
    fontSize: '80%'
  },

  name: {
    paddingRight: 5,
    ':hover': {
      color: 'rgba(0, 121, 107, 1)'
    }
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
  }

  render() {
    const {pack} = this.props;
    const dateInstalledRelative = pack['Install Date'].fromNow();

    return <ListItem
      onClick={::this.onClick}>

      <span key={1} style={[style.name]}>
        {pack['Name']}
      </span>
      <span key={2} style={[style.date]}>
        {' '}{dateInstalledRelative}
      </span>
      <p key={3} style={[style.description]}>
         {' '} {pack['Description']}
      </p>
    </ListItem>;
  }

  onClick() {
    // console.info('[PackageListItem.jsx] ', this.props);

    // this.props.uninstall(this.props.pack);
    // console.info('[PackageListItem.jsx] ', this.props.pack);
  }

};
