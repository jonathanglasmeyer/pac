import {setStatus} from './AppActions';
import * as mock from '../../test/fixtures';
import {collectState} from '../../test/helpers';
import reducer from './AppReducer';

describe('App', () => {
  describe('actions', () => {
    it('setStatus', () => {
      assert.deepEqual(setStatus(mock.status), {type: 'RECEIVE_STATUS', payload: {status: mock.status}});
    });
  });

  describe('reducer', () => {
    it('returns the initial state', () => {
      const r = reducer(undefined, {});
      assert.deepEqual(r, {});
    });

    it('handles RECEIVE_STATUS', () => {
      const appState = {};
      const r = reducer(appState, {type: 'RECEIVE_STATUS', payload: {status: mock.status}});
      assert.deepEqual(r, {status: mock.status});
    });

    it('handles the default case', () => {
      const appState = {status: 'happy'};
      const r = reducer(appState, {type: 'SOME_OTHER_ACTION'});
      assert.deepEqual(r, appState);
    });
  });


  /**
   * Test the slice of the state tree handled by this reducer
   * by dispatching the action and asserting the resulting state
   *
   * In comparison to reducer tests this tests the action creator and
   * the reducer integration
   */
  describe('state', () => {
    it('is correctly transformed by setStatus', async () => {
      const result = await collectState({
        reducer,
        action: setStatus(mock.status),
      });

      assert(result.length === 1);
      assert.deepEqual(result[0], {
        action: {type: 'RECEIVE_STATUS', payload: {status: mock.status}},
        result: {status: mock.status},
      });
    });
  });
});
