import React, {PropTypes} from 'react';
import ValidatedComponent from 'utils/ValidatedComponent.jsx';

const style = {
  fontSize: 16,
  lineHeight: '24px'
};

@Radium
export default class Subhead extends ValidatedComponent {

  static propTypes = {
    children: PropTypes.node
  }

  render() {

    return <span style={style}>
      {this.props.children}
    </span>;
  }

}
