import {takeEvery} from 'redux-saga';
import {put} from 'redux-saga/effects';
import moment from 'moment';

import mockPackages from '../mockPackages';

// const DEVELOPMENT = process.env.NODE_ENV === 'development';

// Our worker Saga: will perform the async increment task
function* loadPackages() {
  const packages = mockPackages.map((pack) => ({
    ...pack,
    date: moment(new Date(pack.date)),
  }));
  yield put({type: 'RECEIVE_PACKAGES', packages});
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchLoadPackages() {
  yield* takeEvery('LOAD_PACKAGES', loadPackages);
}
