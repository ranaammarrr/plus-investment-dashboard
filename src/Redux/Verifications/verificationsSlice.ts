
import { createSlice } from '@reduxjs/toolkit';
import { VerificationsState } from './types';
import { getAllVerificationsRequests } from './verificationsAction';


const initialState: VerificationsState = {
  verifications: [],
  isLoading: false,
  error: null,
};

const verificationsSlice = createSlice({
  name: 'verification',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllVerificationsRequests.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllVerificationsRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.verifications = action.payload;
      })
      .addCase(getAllVerificationsRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'An error occurred.';
      });
  },
});

export const verificationsReducer = verificationsSlice.reducer;
