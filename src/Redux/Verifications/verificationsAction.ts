import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiError, Verifications } from "./types";
import { BASE_URL, ENDPOINTS } from "../../Utils/constants";
import { getToken, toastMessage } from "../../Utils/helperFunctions";

const token = getToken();
export const getAllVerificationsRequests = createAsyncThunk<
  Verifications[],
  void,
  { rejectValue: ApiError }
>("verification/all", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${BASE_URL}${ENDPOINTS.GET_ALL_VERIFICATION_REQUESTS}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      toastMessage({
        type: "error",
        content: `Cannot get all users' data`,
        duration: 5,
      });
      return rejectWithValue({ message: errorMessage });
    }

    const apiResponse = await response.json();

    if (!apiResponse.success) {
      toastMessage({
        type: "error",
        content: `Cannot get all users' data`,
        duration: 5,
      });

      return rejectWithValue({ message: `Cannot get all users' data` });
    }

    return apiResponse.data;
  } catch (error) {
    return rejectWithValue({ message: "An error occurred" });
  }
});

export const approveVerificationStatus = createAsyncThunk<
  Verifications[],
  { status: string; verificationId: string },
  { rejectValue: ApiError }
>("verification/approval", async (body, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${BASE_URL}${ENDPOINTS.APPROVE_VERIFICATION_REQUESTS}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      toastMessage({
        type: "error",
        content: `Error while updating approval`,
        duration: 5,
      });
      return rejectWithValue({ message: errorMessage });
    }

    const apiResponse = await response.json();

    if (!apiResponse.success) {
      toastMessage({
        type: "error",
        content: `Error while updating approval`,
        duration: 5,
      });

      return rejectWithValue({ message: `Error while updating approval` });
    }
    toastMessage({
      type: "success",
      content: `Status updated to ${body.status}`,
      duration: 5,
    });
    return apiResponse.data;
  } catch (error) {
    return rejectWithValue({ message: "An error occurred" });
  }
});
