import React from 'react';
// import ValidatedComponent from 'utils/ValidatedComponent.jsx';

// import {List} from 'widgets';
// import {PackageListItem} from 'pages/PackageListPage';
// import {LoadingPage} from 'pages';

// import {Dialog, Snackbar} from 'material-ui';

const PackageListItem = ({children: pac}) => <div>
  {pac.Name}
</div>;

export default ({packages}) => {
  console.info('[PackageList.jsx] packages: ', packages);
  return <div>
    {packages.map((pac, idx) =>
      <PackageListItem key={idx}>{pac}</PackageListItem>)}
  </div>;
};
