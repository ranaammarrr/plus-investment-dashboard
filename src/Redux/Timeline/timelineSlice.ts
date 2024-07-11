import { createSlice } from '@reduxjs/toolkit';
import { TimelinesState } from './types';
import { getAllTimeline, getTimelineById } from './timelineAction';

const initialState: TimelinesState = {
  timelines: [],
  timeLineById: null,
  isLoading: false,
  error: null,
};

const timelineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTimeline.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllTimeline.fulfilled, (state, action) => {
        state.isLoading = false;
        state.timelines = action.payload;
      })
      .addCase(getAllTimeline.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'An error occurred.';
      })
      .addCase(getTimelineById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTimelineById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.timeLineById = action.payload
      })
      .addCase(getTimelineById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'An error occurred.';
      });
  },
});

export const timelineReducer = timelineSlice.reducer;