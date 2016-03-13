import styles from './PackageList.less.module'

import React, {PropTypes} from 'react'
import moment from 'moment'
import {pure, compose, setPropTypes, lifecycle} from 'recompose'
import {noop} from 'lodash'

import {connect} from 'react-redux'
import * as packageActions from './PackageActions'

const component = ({propTypes, component: component_, setup}) => {
  const fns = [
    ...(setup && lifecycle(({props}) => setup(props), noop)),
    setPropTypes(propTypes),
    pure,
  ].filter((f) => f)
  const composedFn = compose(...fns)
  console.info('[PackageList.js] composed: ', composedFn)

  const decoratedComponent = composedFn(component_)
  console.info('[PackageList.js] decoratedComponent: ', decoratedComponent)

  return decoratedComponent
}

export const PackageListItem = pure(({children: pac, onUninstall}) => {
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

  component: ({packages, uninstallPackage}) => {
    if (!packages.length) {
      return <div style={{color: '#888', marginLeft: 20}}>Crunching...</div>
    }
    return <div>
      {packages.map((pac, idx) =>
        <PackageListItem key={idx} onUninstall={uninstallPackage}>{pac}</PackageListItem>)}
    </div>
  },
})

console.info('[PackageList.js] PackageList: ', PackageList)
export default connect(
  (state) => ({
    packages: state.packages,
  }),
  packageActions,
)(PackageList)
