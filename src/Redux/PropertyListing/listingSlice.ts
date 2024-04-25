import { createSlice } from '@reduxjs/toolkit';
import { deleteProperty, getAllProperties } from './listingAction';
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
        console.log('action.payload',action.payload)
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
      });
  },
});

export const propertyReducer = propertySlice.reducer;
