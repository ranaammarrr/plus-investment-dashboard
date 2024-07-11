import { createSlice } from '@reduxjs/toolkit';
import { TransactionState } from './types';
import { getAllInvoices } from './TransactionAction';

const initialState: TransactionState = {
  transaction: [],
  isLoading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: 'property',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllInvoices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllInvoices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transaction = action.payload;
      })
      .addCase(getAllInvoices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'An error occurred.';
      })
      
  },
});

export const transactionReducer = transactionSlice.reducer;