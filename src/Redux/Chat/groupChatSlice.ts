import { createSlice } from "@reduxjs/toolkit";
import { getAllGroupChats } from "./chatAction";
import { ChatState } from "./types";

const initialState: ChatState = {
  chats: null,
  chatByUserId: null,
  allGroupChats: null,
  isLoading: false,
  error: null,
};

const groupChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllGroupChats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllGroupChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allGroupChats = action.payload;
      })
      .addCase(getAllGroupChats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "An error occurred.";
      });
  },
});

export const groupChatReducer = groupChatSlice.reducer;
