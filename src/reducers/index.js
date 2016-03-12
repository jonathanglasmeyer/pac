import packages from '../pac';
import status from './status';
import {combineReducers} from 'redux';

export default combineReducers({
  packages,
  status,
});
