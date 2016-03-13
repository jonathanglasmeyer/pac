import {takeEvery} from 'redux-saga';
import {put, call} from 'redux-saga/effects';

import * as pacman from '../../utils/pacman';

export function* loadPackages() {
  const packages = yield call(pacman.getPackages);
  yield put({type: 'RECEIVE_PACKAGES', payload: {packages}});
}

export function* uninstallPackage({payload: {name: packageName}}) {
  const status = yield call(pacman.uninstallPackage, packageName);
  yield put({type: 'RECEIVE_STATUS', status});
}

export function* watchLoadPackages() {
  yield* takeEvery('LOAD_PACKAGES', loadPackages);
}

export function* watchUninstallPackage() {
  yield* takeEvery('UNINSTALL_PACKAGE', uninstallPackage);
}
