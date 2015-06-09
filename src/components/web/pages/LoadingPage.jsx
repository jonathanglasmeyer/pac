import React, {PropTypes} from 'react';
import ValidatedComponent from 'utils/ValidatedComponent.jsx';

import Centered from '../layouts/Centered.jsx';
import {CircularProgress} from 'material-ui';
import {Color} from 'styles/vars';

const style = {
  color: Color.gray
};

@Radium.Enhancer
export default class LoadingPage extends ValidatedComponent {

  static propTypes = {
    text: PropTypes.string
  }

  render() {
    console.info('[LoadingPage.jsx] ', 'load');

    return <Centered>
      <CircularProgress mode="indeterminate" size={.6}/>
      <span style={[style]}>Crunching stdout...</span>
    </Centered>;
  }

}
