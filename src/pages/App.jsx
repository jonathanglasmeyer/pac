import React, {Component, PropTypes} from 'react';

export default class App extends Component {

  componentDidMount() {
    this.props.loadPackages();
  }

  render() {
    const {packages, incrementAsync, loadPackages} = this.props;
    console.info('[App.jsx] ', packages);
    return <ul>
    {packages.map(p => <li key={p['Name']}>
      <span className='package-name'>
        {p['Name']}
      </span>
      <span className='description'>
        {p['Description']}
      </span>
    </li>)}
    </ul>;
  }

}
