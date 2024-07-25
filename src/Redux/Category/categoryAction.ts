import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, ENDPOINTS } from "../../Utils/constants";
import { getToken, toastMessage } from "../../Utils/helperFunctions";
import { ApiError, Body, Categories } from "./types";

const token = getToken();

export const getAllCategories = createAsyncThunk<
  Categories[],
  void,
  { rejectValue: ApiError }
>("timeline/all", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}${ENDPOINTS.GET_ALL_CATEGORIES}`, {
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
        content: `Cannot get all category' data`,
        duration: 5,
      });
      return rejectWithValue({ message: errorMessage });
    }

    const apiResponse = await response.json();

    if (!apiResponse.success) {
      toastMessage({
        type: "error",
        content: `Cannot get all category' data`,
        duration: 5,
      });

      return rejectWithValue({ message: `Cannot get all category' data` });
    }

    return apiResponse.data;
  } catch (error) {
    return rejectWithValue({ message: "An error occurred" });
  }
});

// POST CATEGORY API.....

export const createCategories = createAsyncThunk<
  Categories,
  Body,
  { rejectValue: ApiError }
>("category/create", async ({ label, icon }, { rejectWithValue }) => {
  const body = { label: label, icon: icon };
  try {
    const response = await fetch(
      `${BASE_URL}${ENDPOINTS.POST_ALL_CATEGORIES}`,
      {
        method: "POST",
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
        content: `Cannot post all category' data`,
        duration: 5,
      });
      return rejectWithValue({ message: errorMessage });
    }

    const apiResponse = await response.json();

    if (!apiResponse.success) {
      toastMessage({
        type: "error",
        content: `Cannot post all category' data`,
        duration: 5,
      });

      return rejectWithValue({ message: `Cannot post all category' data` });
    }

    toastMessage({
      type: "success",
      content: `Category created successfully`,
      duration: 5,
    });

    return apiResponse.data;
  } catch (error) {
    return rejectWithValue({ message: "An error occurred" });
  }
});

//   Delete Category.....
export const deleteCategory = createAsyncThunk<
  void,
  string,
  { rejectValue: ApiError }
>("properties/delete", async (category_Id, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${BASE_URL}${ENDPOINTS.DELETE_CATEGORY}/${category_Id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ _id: category_Id }),
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      toastMessage({
        type: "error",
        content: `Cannot delete category with ID ${category_Id}`,
        duration: 5,
      });
      return rejectWithValue({ message: errorMessage });
    }

    const apiResponse = await response.json();

    if (!apiResponse.success) {
      toastMessage({
        type: "error",
        content: `Cannot delete category`,
        duration: 5,
      });
      return rejectWithValue({ message: `Cannot delete category ` });
    }

    toastMessage({
      type: "success",
      content: `Category deleted successfully`,
      duration: 5,
    });

    return;
  } catch (error) {
    return rejectWithValue({ message: "An error occurred" });
  }
});
