import { createSlice } from "@reduxjs/toolkit";
import { getAllChats, getAllGroupChats, getChatIdByUsers } from "./chatAction";
import { ChatState } from "./types";

const initialState: ChatState = {
  chats: null,
  chatByUserId: null,
  allGroupChats: null,
  isLoading: false,
  error: null,
  // chatLists: undefined
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllChats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chats = action.payload;
      })
      .addCase(getAllChats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "An error occurred.";
      })
      .addCase(getChatIdByUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getChatIdByUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chatByUserId = action.payload;
      })
      .addCase(getChatIdByUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "An error occurred.";
      });
  },
});

export const chatReducer = chatSlice.reducer;
