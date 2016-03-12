import {takeEvery} from 'redux-saga';
import {put, call} from 'redux-saga/effects';
import moment from 'moment';

import * as pacman from '../utils/pacman';

import mockPackagesRaw from '../mockPackages';
const getMockPackages = () => Promise.resolve(mockPackagesRaw.map((pack) => ({
  ...pack,
  date: moment(new Date(pack.date)),
})));

function* loadPackages() {
  const packages = yield call(__DEV__ ? getMockPackages : pacman.getPackages);
  yield put({type: 'RECEIVE_PACKAGES', packages});
}

function* uninstallPackage() {
  const status = yield call(pacman.uninstallPackage);
  yield put({type: 'RECEIVE_STATUS', status});
}

export function* watchLoadPackages() {
  yield* takeEvery('LOAD_PACKAGES', loadPackages);
}

export function* watchUninstallPackages() {
  yield* takeEvery('UNINSTALL_PACKAGE', uninstallPackage);
}
