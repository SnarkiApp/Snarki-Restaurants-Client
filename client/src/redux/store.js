import { configureStore } from '@reduxjs/toolkit';
import {combineReducers} from "redux"; 
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import addClaimRestaurantReducer from './reducers/addClaimRestaurant';
import registerRestaurantReducer from './reducers/registerRestaurant';

const persistConfig = {
  key: 'snarki-persist-key',
  storage
};

const rootReducer = combineReducers({
  addClaimRestaurant: addClaimRestaurantReducer,
  registerRestaurant: registerRestaurantReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

const persistedStore = persistStore(store);
export {persistedStore};
export default store;
