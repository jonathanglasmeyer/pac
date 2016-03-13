import {takeEvery} from 'redux-saga';
import {put, call} from 'redux-saga/effects';
import moment from 'moment';

import * as pacman from '../../utils/pacman';

import mockPackagesRaw from './mockPackages';
export const getMockPackages = () => Promise.resolve(mockPackagesRaw.map((pack) => ({
  ...pack,
  date: moment(new Date(pack.date)),
})));

export function* loadPackages() {
  const packages = yield call(__DEV__ ? getMockPackages : pacman.getPackages);
  yield put({type: 'RECEIVE_PACKAGES', packages});
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
