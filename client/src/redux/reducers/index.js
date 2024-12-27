import { combineReducers } from 'redux';
import themeReducer from './themereducer';
import loadingReducer from './loadingReducer';
import userReducer from './userReducer';
import templateReducer from './templateReducer';

const rootReducer = combineReducers({
  theme: themeReducer,
  loader:loadingReducer,
  user :userReducer,
  template:templateReducer,
});

export default rootReducer;
