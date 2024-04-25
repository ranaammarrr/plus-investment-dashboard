import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './Auth/authSlice';
import { userReducer } from './User/userSlice';
import { propertyReducer } from './PropertyListing/listingSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    property:propertyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
