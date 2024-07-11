
import { createSlice } from '@reduxjs/toolkit';
import { EditPropertyState } from './types';
import { editProperty } from './EditPropertyAction';

const initialState: EditPropertyState = {
edit: [],
  isLoading: false,
  error: null,
};

const editPropertySlice = createSlice({
  name: 'edit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editProperty.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.edit = action.payload;
      })
      .addCase(editProperty.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'An error occurred.';
      });
  },
});

export const editPropertyReducer = editPropertySlice.reducer;
