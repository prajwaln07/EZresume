import { combineReducers } from 'redux';
import themeReducer from './themereducer';

const rootReducer = combineReducers({
  theme: themeReducer,
});

export default rootReducer;
