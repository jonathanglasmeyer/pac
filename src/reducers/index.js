import packages from './packages';
import status from './status';
import {combineReducers} from 'redux';

export default combineReducers({
  packages,
  status,
});
