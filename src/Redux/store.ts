import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './Auth/authSlice';
import { userReducer } from './User/userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
