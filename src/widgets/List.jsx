import React, {Component, PropTypes} from 'react';

const style = {
  base: {

  }
};

@Radium.Enhancer
export default class List extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired
  }

  render() {

    return <ul>
      {this.props.children}
    </ul>;
  }

};
