import { createSlice } from '@reduxjs/toolkit';
import {Tags, TagsState } from './types';
import { deleteTag, getAllPropertyTags } from './tagsAction';

const initialState: TagsState = {
  tag: [],
  isLoading: false,
  error: null,
};

const tagsSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPropertyTags.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllPropertyTags.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tag = action.payload;
      })
      .addCase(getAllPropertyTags.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'An error occurred.';
      })
      .addCase(deleteTag.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteTag.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'An error occurred.';
      })
  },
});

export const tagsReducer = tagsSlice.reducer;