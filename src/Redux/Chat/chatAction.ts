import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, ENDPOINTS } from "../../Utils/constants";
import { getToken, toastMessage } from "../../Utils/helperFunctions";
import { ApiError, Chat } from "./types";
const token = getToken();

export const getAllChatList = createAsyncThunk<
  Chat,
  string,
  { rejectValue: ApiError }
>("properties/getPropertyDetail", async (chat_Id, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${BASE_URL}${ENDPOINTS.GET_CHAT_LIST}/${chat_Id}`,
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
        content: `Cannot fetch chat list with ID ${chat_Id}`,
        duration: 5,
      });
      return rejectWithValue({ message: errorMessage });
    }

    const apiResponse = await response.json();
    if (!apiResponse.success) {
      // Ensure `apiResponse` has a `success` field if applicable
      toastMessage({
        type: "error",
        content: `Cannot fetch chat list`,
        duration: 5,
      });
      return rejectWithValue({ message: `Cannot fetch chat list` });
    }

    toastMessage({
      type: "success",
      content: `Chat list fetched successfully`,
      duration: 5,
    });

    return apiResponse.data;
  } catch (error) {
    return rejectWithValue({ message: "An error occurred" });
  }
});

// getChatIdByUsers ...

export const getChatIdByUsers = createAsyncThunk<
  Chat,
  any,
  { rejectValue: ApiError }
>("chat/getChatIdByUsers", async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${BASE_URL}${ENDPOINTS.GET_CHAT_BY_ID_USERS}/${data?._id}/${data?.senderId}`,
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
        content: `Cannot fetch chat list with ID ${data}`,
        duration: 5,
      });
      return rejectWithValue({ message: errorMessage });
    }

    const apiResponse = await response.json();
    if (!apiResponse.success) {
      // Ensure `apiResponse` has a `success` field if applicable
      toastMessage({
        type: "error",
        content: `Cannot fetch chat list`,
        duration: 5,
      });
      return rejectWithValue({ message: `Cannot fetch chat list` });
    }

    toastMessage({
      type: "success",
      content: `Chat list fetched successfully`,
      duration: 5,
    });

    return apiResponse.data;
  } catch (error) {
    return rejectWithValue({ message: "An error occurred" });
  }
});

export const getAllChats = createAsyncThunk<
  Chat,
  void,
  { rejectValue: ApiError }
>("chat/getAllChat", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}${ENDPOINTS.GET_ALL_CHAT}`, {
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
        content: `Cannot fetch chat list with ID`,
        duration: 5,
      });
      return rejectWithValue({ message: errorMessage });
    }
    const apiResponse = await response.json();
    if (!apiResponse.succcess) {
      // Ensure `apiResponse` has a `success` field if applicable
      toastMessage({
        type: "error",
        content: `Cannot fetch chat list`,
        duration: 5,
      });
      return rejectWithValue({ message: `Cannot fetch chat list` });
    }

    toastMessage({
      type: "success",
      content: `Chat list fetched successfully`,
      duration: 5,
    });

    return apiResponse.data.chat;
  } catch (error) {
    return rejectWithValue({ message: "An error occurred" });
  }
});

// Group Chat...
export const getAllGroupChats = createAsyncThunk<
  Chat,
  any,
  { rejectValue: ApiError }
>("chat/getChatIdByUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}${ENDPOINTS.GET_ALL_GROUP_CHAT}`, {
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
        content: `Cannot fetch chat list`,
        duration: 5,
      });
      return rejectWithValue({ message: errorMessage });
    }
    const apiResponse = await response.json();
    if (!apiResponse.succcess) {
      // Ensure `apiResponse` has a `success` field if applicable
      toastMessage({
        type: "error",
        content: `Cannot fetch chat list`,
        duration: 5,
      });
      return rejectWithValue({ message: `Cannot fetch chat list` });
    }

    toastMessage({
      type: "success",
      content: `Chat list fetched successfully`,
      duration: 5,
    });

    return apiResponse.data.groupChat;
  } catch (error) {
    return rejectWithValue({ message: "An error occurred" });
  }
});
