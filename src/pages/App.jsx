import React, {Component, PropTypes} from 'react';

export default class App extends Component {

  componentDidMount() {
    this.props.loadPackages();
  }
  render() {
    const {packages, incrementAsync, loadPackages} = this.props;
    console.info('[App.jsx] ', this.props);
    return <ul>
    {packages.map(p => <li key={p}>{p}</li>)}
    </ul>;
  }

}
