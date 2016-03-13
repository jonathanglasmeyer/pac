import reducer from './AppReducer';

describe('AppReducer', () => {
  it('returns the initial state', () => {
    const r = reducer(undefined, {});
    assert.deepEqual(r, {});
  });

  it('handles RECEIVE_STATUS', () => {
    const appState = {};
    const status = {type: 'success', text: 'Happy!'};
    const r = reducer(appState, {type: 'RECEIVE_STATUS', status});
    assert.deepEqual(r, {status});
  });

  it('handles the default case', () => {
    const appState = {status: 'happy'};
    const r = reducer(appState, {type: 'SOME_OTHER_ACTION'});
    assert.deepEqual(r, appState);
  });
});
