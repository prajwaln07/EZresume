import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Combine your reducers here 
import resumeReducer from './reducers/resumeSlice';

const store = configureStore({
  reducer: rootReducer,
  resume: resumeReducer,

});

export default store;
