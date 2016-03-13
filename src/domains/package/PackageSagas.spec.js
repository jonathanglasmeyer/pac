import {put, call} from 'redux-saga/effects';
import {
  loadPackages, 
  getMockPackages, 
  uninstallPackage,
  watchLoadPackages,
} from './PackageSagas';

import * as pacman from '../../utils/pacman';

describe('PackageSagas', () => {
  it('loadPackages', () => {
    const gen = loadPackages();
    const packages = [];
    assert.deepEqual(gen.next().value, call(getMockPackages));
    assert.deepEqual(gen.next(packages).value, put({type: 'RECEIVE_PACKAGES', packages}));
    assert.deepEqual(gen.next(), {done: true, value: undefined});
  });

  it('uninstallPackage', () => {
    const name = 'package name';
    const status = {type: 'success', text: 'It worked'};
    const gen = uninstallPackage({payload: {name}});
    assert.deepEqual(gen.next().value, call(pacman.uninstallPackage, name));
    assert.deepEqual(gen.next(status).value, put({type: 'RECEIVE_STATUS', status}));
    assert.deepEqual(gen.next(), {done: true, value: undefined});
  });

});
