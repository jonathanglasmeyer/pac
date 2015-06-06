import {LOAD_PACKAGES} from '../constants/ActionTypes.js';

function createStore(initialState, handlers) {
  return (state = initialState, action) =>
    handlers[action.type] ?
      handlers[action.type](state, action) :
      state;
}

export default createStore([], {
  [LOAD_PACKAGES]: (state, action) => action.packages
});
