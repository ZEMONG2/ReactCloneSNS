import { combineReducers } from 'redux';
import config from './config';
import layouts from './layouts';
import auth from './auth';

const rootReducer = combineReducers({
  config,
  layouts,
  auth
});

export default rootReducer;
