
import { createSlice } from '@reduxjs/toolkit';
import { UserState } from './types';
import { getAllUsers } from './userAction';

const initialState: UserState = {
users: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'An error occurred.';
      });
  },
});

export const userReducer = userSlice.reducer;
