import {LOAD_PACKAGES} from '../constants/ActionTypes.js';
import {createStore} from 'utils/createStore.js';

export default createStore([], {
  [LOAD_PACKAGES]: (state, action) => action.packages
});
