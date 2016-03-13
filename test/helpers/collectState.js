import {getStore} from '../fixtures';
import sinon from 'sinon';
import _ from 'lodash';

/**
 * Collect state results of multiple actions into array until count (of actions dispatched) has been reached.
 * count === 2 would collect the results until 2 actions have been fired.
 *
 * Returns an array of {action, result}, where
 * - the actions is the action dispatched
 * - and result is the resulting state slice
 */
export default ({reducer, action, count = 1}) => {
  // Sinon can't spy on fns directly, so wrap it in an object
  const reducerObj = {reducer};
  const reducerSpy = sinon.spy(reducerObj, 'reducer');

  const store = getStore(reducerSpy);

  return new Promise((resolve) => {
    let i = 0;
    const states = [];
    const listener = () => {
      i++;
      states.push(store.getState());
      if (i === count) {
        const actions = reducerSpy.args.slice(1).map((arg) => arg[1]);

        const result = _.zipWith(actions, states, (action, state) => ({action, result: state}));
        resolve(result);
      }
    };
    store.subscribe(listener);
    store.dispatch(action);
  });
};
