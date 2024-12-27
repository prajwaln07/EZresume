import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default to localStorage
import rootReducer from './reducers'; // Combine your reducers here
import { combineReducers } from 'redux';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,  // Specifies localStorage for persistence
  whitelist: ['user','theme','template'],  // Persist only the 'user' reducer (authentication-related state)
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production', // Optional: Enable Redux DevTools in development
});

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };
