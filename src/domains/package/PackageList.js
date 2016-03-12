import styles from './PackageList.less.module';

import React, {PropTypes} from 'react';
import {pure, compose, setPropTypes, lifecycle} from 'recompose';
import {noop} from 'lodash';

import {connect} from 'react-redux';
import * as packageActions from './PackageActions';

const component = (propTypes, ...otherFns) => compose(
  ...otherFns,
  setPropTypes(propTypes),
  pure,
);

export const PackageListItem = pure(({children: pac, onUninstall}) => {
  const relativeDate = pac.date.fromNow();

  const handleClick = () => {
    const yes = window.confirm(`Uninstall ${pac.name}?`); // eslint-disable-line no-alert
    if (yes) {
      onUninstall(pac.name);
    }
  };

  return <div className={styles.item} onClick={handleClick}>
    <p className={styles.itemTitle}>{`${pac.name} `}<span className={styles.itemDate}>{`(${relativeDate})`}</span></p>
    <p className={styles.itemDescription}>{`${pac.description} (${pac.size})`}</p>
  </div>;
});

export const PackageList = component({
  packages: PropTypes.array,
  uninstallPackage: PropTypes.func.isRequired,
},
  lifecycle(
    ({props}) => { props.loadPackages(); },
    noop
  ),
)(({
  packages,
  uninstallPackage,
}) => {
  if (!packages.length) {
    return <div style={{color: '#888', marginLeft: 20}}>Crunching...</div>;
  }
  return <div>
    {packages.map((pac, idx) =>
      <PackageListItem key={idx} onUninstall={uninstallPackage}>{pac}</PackageListItem>)}
  </div>;
});


export default connect(
  (state) => ({
    packages: state.packages,
  }),
  packageActions,
)(PackageList);
