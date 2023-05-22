import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import propertiesReducer from '../features/properties/propertySlice';
import globalReducer from '../features/global/globalSlice';
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

import {combineReducers} from "redux"; 
import AsyncStorage from '@react-native-async-storage/async-storage';


const persistConfig = {
  key: 'root',
  storage:AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
  
  properties:propertiesReducer,
  global:globalReducer
},));

export const store = configureStore({
  reducer: persistedReducer,
});



export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
