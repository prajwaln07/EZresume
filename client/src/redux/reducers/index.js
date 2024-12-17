import { combineReducers } from 'redux';
import themeReducer from './themereducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
  theme: themeReducer,
  loader:loadingReducer,
});

export default rootReducer;
