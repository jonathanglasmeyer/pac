import {put, call} from 'redux-saga/effects';
import {loadPackages, getMockPackages} from './PackageSagas';

describe('PackageSagas', () => {
  describe('loadPackages', () => {
    it('works', () => {
      const gen = loadPackages();
      const packages = [];
      assert.deepEqual(gen.next().value, call(getMockPackages));
      assert.deepEqual(gen.next(packages).value, put({type: 'RECEIVE_PACKAGES', packages}));
      assert.deepEqual(gen.next(), {done: true, value: undefined});
    });
  });
});
