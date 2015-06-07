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
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    style: PropTypes.array
  }

  render() {
    const {style: style_ = [], ...props} = this.props;

    return <li style={[style.base, ...style_]} {...props}>
      {this.props.children}
    </li>;
  }

};
