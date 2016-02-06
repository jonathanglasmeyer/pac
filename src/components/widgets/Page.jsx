import styles from './Page.less.module';
import React from 'react';

export default ({children}) => <div className={styles.base}>
  {children}
</div>;
