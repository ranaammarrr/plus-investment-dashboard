import { createSlice } from "@reduxjs/toolkit";
import { TicketsState } from "./types";
import { getAllTickets } from "./TicketsActions";

const initialState: TicketsState = {
  tickets: null,
  isLoading: false,
  error: null,
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTickets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tickets = action.payload;
      })
      .addCase(getAllTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "An error occurred.";
      });
  },
});

export const ticketsReducer = ticketsSlice.reducer;
