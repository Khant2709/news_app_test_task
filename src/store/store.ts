import {configureStore} from '@reduxjs/toolkit';
import newsReducer from './newsSlice';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';


export const store = configureStore({
  reducer: {
    news: newsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;