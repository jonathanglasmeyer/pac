import React from 'react';
import styles from './PackageList.less.module';

const PackageListItem = ({children: pac, onUninstall}) => {
  const relativeDate = pac.date.fromNow();
  return <div className={styles.item} onClick={() => onUninstall(pac.name)}>
    <p className={styles.itemTitle}>{`${pac.name} `}<span className={styles.itemDate}>{`(${relativeDate})`}</span></p>
    <p className={styles.itemDescription}>{`${pac.description} (${pac.size})`}</p>
  </div>;
};

export default ({packages, onUninstall}) => {

  if (!packages || !packages.length) {
    return <div style={{color: '#333'}}>Crunching...</div>;
  }
  return <div>
    {packages.map((pac, idx) =>
      <PackageListItem key={idx} onUninstall={onUninstall}>{pac}</PackageListItem>)}
  </div>;
};

