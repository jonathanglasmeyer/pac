import React, {Component, PropTypes} from 'react';
import ValidatedComponent from 'utils/ValidatedComponent.jsx'

const style = {
  base: {
    listStyleType: 'none',
    cursor: 'default',
    borderBottom: '1px solid rgba(0,0,0,0.08)',
    padding: '5px 20px',

    ':hover': {
      background: 'rgba(0, 0, 0, .02)'
    }
  }
};

@Radium.Enhancer
export default class ListItem extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
  }

  render() {
    return <li style={[style.base]} {...this.props}>
      {this.props.children}
    </li>;
  }

};
