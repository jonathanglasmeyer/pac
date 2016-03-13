import styles from './PackageList.less.module'

import React, {PropTypes} from 'react'
import moment from 'moment'
import {pure} from 'recompose'

import {connect} from 'react-redux'
import * as packageActions from './PackageActions'
import {component} from '../../utils'

export const PackageListItem = component({
  propTypes: {
    pac: PropTypes.object.isRequired,
    onUninstall: PropTypes.func.isRequired,
  },
},
({pac, onUninstall}) => {
  const relativeDate = moment(pac.date).fromNow()

  const handleClick = () => {
    const yes = window.confirm(`Uninstall ${pac.name}?`) // eslint-disable-line no-alert
    if (yes) {
      onUninstall(pac.name)
    }
  }

  return <div className={styles.item} onClick={handleClick}>
    <p className={styles.itemTitle}>{`${pac.name} `}<span className={styles.itemDate}>{`(${relativeDate})`}</span></p>
    <p className={styles.itemDescription}>{`${pac.description} (${pac.size})`}</p>
  </div>
})

export const PackageList = component({
  propTypes: {
    packages: PropTypes.array,
    uninstallPackage: PropTypes.func.isRequired,
  },
  setup: (props) => props.loadPackages(),
},
({packages, uninstallPackage}) => {
  if (!packages.length) {
    return <div style={{color: '#888', marginLeft: 20}}>Crunching...</div>
  }
  return <div>
    {packages.map((pac, idx) => <PackageListItem key={idx} onUninstall={uninstallPackage} pac={pac} />)}
  </div>
})

export default connect(
  (state) => ({
    packages: state.packages,
  }),
  packageActions,
)(PackageList)
