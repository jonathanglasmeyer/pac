import {takeEvery} from 'redux-saga';
import {put} from 'redux-saga/effects';

// an utility function: return a Promise that will resolve after 1 second
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Our worker Saga: will perform the async increment task
function* loadPackages() {
  yield delay(1000);
  yield put({type: 'LOAD_PACKAGES', packages: 'foo'});
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchLoadPackages() {
  yield* takeEvery('LOAD_PACKAGES_REQUEST', loadPackages);
}
