import React, {Component, PropTypes} from 'react';
import ValidatedComponent from 'utils/ValidatedComponent.jsx'

const style = {
  base: {
    listStyleType: 'none'
  }
};

@Radium.Enhancer
export default class ListItem extends ValidatedComponent {

  static propTypes = {
    children: PropTypes.node.isRequired
  }

  render() {

    return <li style={[style.base]}>
      {this.props.children}
    </li>;
  }

};
