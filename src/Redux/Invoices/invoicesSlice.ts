import { createSlice } from '@reduxjs/toolkit';
import { InvoicesState } from './types';
import { getInvoicesById } from './invoicesActions';

const initialState: InvoicesState = {
  invoices: null,
  isLoading: false,
  error: null,
};

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInvoicesById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getInvoicesById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.invoices = action.payload
      })
      .addCase(getInvoicesById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'An error occurred.';
      });
  },
});

export const invoicesReducer = invoicesSlice.reducer;