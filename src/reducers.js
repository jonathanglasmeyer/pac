import packages from './domains/package/PackageReducer'
import app from './App/AppReducer'
import {combineReducers} from 'redux'

export default combineReducers({
  packages,
  app,
})
