import { combineReducers } from 'redux';
import themeReducer from './themereducer';
import loadingReducer from './loadingReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  theme: themeReducer,
  loader:loadingReducer,
  user :userReducer,
});

export default rootReducer;
