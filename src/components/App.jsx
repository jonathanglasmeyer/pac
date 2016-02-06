import React, {Component, PropTypes} from 'react';
import PackageList from './PackageList';

// // own widgets
// import PackageListController from './controllers/PackageListController.jsx';
// const Code = ({children}) => <pre>{JSON.stringify(children, null, 2)}</pre>;

export default class App extends Component {
  static propTypes = {
    packages: PropTypes.array,
    loadPackages: PropTypes.func,
  };

  componentDidMount() {
    this.props.loadPackages();
  }

  render() {
    const {packages} = this.props;
    return <div>
      <PackageList packages={packages} />
    </div>;
  }
}
