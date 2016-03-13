import {takeEvery} from 'redux-saga'
import {put, call} from 'redux-saga/effects'

import * as PackageActions from './PackageActions'
import * as AppActions from '../../App/AppActions'

import * as pacman from '../../utils/pacman'

export function* loadPackages() {
  const packages = yield call(pacman.getPackages)
  yield put(PackageActions.receivePackages(packages))
}

export function* uninstallPackage({payload: {name: packageName}}) {
  const status = yield call(pacman.uninstallPackage, packageName)
  yield put(AppActions.setStatus(status))
}

export function* watchLoadPackages() {
  yield* takeEvery('LOAD_PACKAGES', loadPackages)
}

export function* watchUninstallPackage() {
  yield* takeEvery('UNINSTALL_PACKAGE', uninstallPackage)
}
