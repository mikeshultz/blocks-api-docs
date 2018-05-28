import { combineReducers } from 'redux';
import api from './api';
import infura from './infura';
import docs from './docs';

const rootReducer = combineReducers({
  api,
  infura,
  docs,
});

export default rootReducer;