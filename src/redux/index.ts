import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {combineReducers} from 'redux';
import createDebugger from 'redux-flipper';
import {persistReducer} from 'redux-persist';
import dataSlice from './UserDataSlice';

const dataPersistConfig = {
  key: 'data',
  storage: AsyncStorage,
};

const AppReducer = combineReducers({
  data: persistReducer(dataPersistConfig, dataSlice),
});

const store = configureStore({
  reducer: AppReducer,
  middleware: getDefaultMiddleware =>
    __DEV__
      ? getDefaultMiddleware({
          serializableCheck: false,
        }).concat(createDebugger())
      : getDefaultMiddleware({
          serializableCheck: false,
        }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof AppReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
