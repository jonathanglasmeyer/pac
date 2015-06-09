import React, {PropTypes} from 'react';
import ValidatedComponent from 'utils/ValidatedComponent.jsx';

const style = {
  base: {
    listStyleType: 'none',
    cursor: 'pointer',
    background: '#fff',
    borderBottom: '1px solid rgba(0,0,0,0.08)',
    minHeight: 72,
    padding: '0 24px',

    ':hover': {
      background: 'rgba(255, 255, 255, .6)'
    },
    ':active': {
      background: 'rgba(0,0,0,.01)'
    },

    display: 'flex'
  },
  left: {
    minWidth: 56,
    display: 'flex',
    alignItems: 'center'
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  big: {
    height: 40
  }

};

@Radium
export default class ListItem extends ValidatedComponent {

  static propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    left: PropTypes.node
  }

  render() {
    const {children, onClick, left, big} = this.props;
    return <li style={[style.base, big && style.big]} {...this.props}>

      {left &&
        <div style={[style.left]}>
          {left}
        </div>
      }

      <div style={[style.content]}>
        {this.props.children}
      </div>
    </li>;
  }

}
