import test from 'ava';
import {put, call} from 'redux-saga/effects';
import {loadPackages, getMockPackages} from './PackageSagas';

test('loadPackages', async (t) => {
  const gen = loadPackages();
  t.same(gen.next().value, call(getMockPackages))
});
