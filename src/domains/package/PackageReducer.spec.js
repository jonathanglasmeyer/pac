import reducer from './PackageReducer';

describe('PackageReducer', () => {
  it('returns the initial state', () => {
    const r = reducer(undefined, {});
    assert.deepEqual(r, []);
  });

  it('handles RECEIVE_PACKAGES', () => {
    const packages = ['foo', 'bar'];
    const r = reducer(['old', 'packages'], {type: 'RECEIVE_PACKAGES', packages});
    assert.deepEqual(r, packages);
  });

  it('handles the default case', () => {
    const packages = ['old', 'packages'];
    const r = reducer(packages, {type: 'SOME_OTHER_ACTION'});
    assert.deepEqual(r, packages);
  });
});
