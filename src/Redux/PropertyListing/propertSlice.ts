import { createSlice } from '@reduxjs/toolkit';
import { approvedProperty, deleteProperty, getAllProperties } from './propertyActions';
import { PropertiesState } from './types';

const initialState: PropertiesState = {
  properties: [],
  isLoading: false,
  error: null,
};

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProperties.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllProperties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.properties = action.payload;
      })
      .addCase(getAllProperties.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'An error occurred.';
      })
      .addCase(deleteProperty.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'An error occurred while deleting the property.';
      })
      // Approved propertySlice 
      .addCase(approvedProperty.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(approvedProperty.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(approvedProperty.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.message : 'An error occurred while approving the property.';
      });
  },
});

export const propertyReducer = propertySlice.reducer;