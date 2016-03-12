import {takeEvery} from 'redux-saga';
import {put, call} from 'redux-saga/effects';
import moment from 'moment';

import * as pacman from '../utils/pacman';

import mockPackagesRaw from '../mockPackages';
const getMockPackages = () => Promise.resolve(mockPackagesRaw.map((pack) => ({
  ...pack,
  date: moment(new Date(pack.date)),
})));


// Our worker Saga: will perform the async increment task
function* loadPackages() {
  const packages = yield call(__DEV__ ? getMockPackages : pacman.getPackages);

  yield put({type: 'RECEIVE_PACKAGES', packages});
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchLoadPackages() {
  yield* takeEvery('LOAD_PACKAGES', loadPackages);
}
