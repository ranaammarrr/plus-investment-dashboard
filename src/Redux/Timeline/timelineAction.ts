import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, ENDPOINTS } from "../../Utils/constants";
import { getToken, toastMessage } from "../../Utils/helperFunctions";
import { ApiError, Timeline, TimelineById } from "./types";

const token = getToken();
export const getAllTimeline = createAsyncThunk<
  Timeline[],
  void,
  { rejectValue: ApiError }
>("timeline/all", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}${ENDPOINTS.GET_ALL_TIMELINES}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      toastMessage({
        type: "error",
        content: `Cannot get all timelines' data`,
        duration: 5,
      });
      return rejectWithValue({ message: errorMessage });
    }

    const apiResponse = await response.json();

    if (!apiResponse.success) {
      toastMessage({
        type: "error",
        content: `Cannot get all timelines' data`,
        duration: 5,
      });

      return rejectWithValue({ message: `Cannot get all timelines' data` });
    }

    return apiResponse.data;
  } catch (error) {
    return rejectWithValue({ message: "An error occurred" });
  }
});

export const getTimelineById = createAsyncThunk<
  TimelineById,
  string,
  { rejectValue: ApiError }
>("timeline/getTimelineByUserId", async (timeline_Id, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${BASE_URL}${ENDPOINTS.GET_TIMELINE_BY_ID}/${timeline_Id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ensure `token` is defined and accessible
        },
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      toastMessage({
        type: "error",
        content: `Cannot fetch property details with ID ${timeline_Id}`,
        duration: 5,
      });
      return rejectWithValue({ message: errorMessage });
    }

    const apiResponse = await response.json();

    if (!apiResponse.success) {
      // Ensure `apiResponse` has a `success` field if applicable
      toastMessage({
        type: "error",
        content: `Cannot fetch property details`,
        duration: 5,
      });
      return rejectWithValue({ message: `Cannot fetch property details` });
    }

    return apiResponse.timelineData; // Return the property details
  } catch (error) {
    return rejectWithValue({ message: "An error occurred" });
  }
});

export const isVisibleTimeline = createAsyncThunk<
  void,
  { _id: string },
  { rejectValue: ApiError }
>("properties/approved", async ({ _id }, { rejectWithValue }) => {
  console.log(_id, "aprovedd Timelineeee");
  try {
    const response = await fetch(
      `${BASE_URL}${ENDPOINTS.IS_VISIBLE_TIMELINE}/${_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const errorMessage = response;
      toastMessage({
        type: "error",
        content: `Cannot update TimeLine`,
        duration: 5,
      });
      return rejectWithValue({ message: errorMessage });
    }
    toastMessage({
      type: "success",
      content: `TimeLine status updated`,
      duration: 5,
    });
    return;
  } catch (error) {
    return rejectWithValue({ message: "An error occurred" });
  }
});
