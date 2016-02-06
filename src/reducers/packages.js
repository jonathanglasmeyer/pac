// import {LOAD_PACKAGES} from '../constants/ActionTypes.js';
// import {createStore} from '../utils/createStore';

export default (state = [], action) => {
  switch (action.type) {
    case 'LOAD_PACKAGES':
      return action.packages;
    default:
      return state;
  }
};
