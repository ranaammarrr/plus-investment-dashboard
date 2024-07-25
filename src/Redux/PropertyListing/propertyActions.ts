import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, ENDPOINTS } from "../../Utils/constants";
import { getToken, toastMessage } from "../../Utils/helperFunctions";
import { ApiError, Property } from "./types";

const token = getToken();

export const getAllProperties = createAsyncThunk<
  Property[],
  void,
  { rejectValue: ApiError }
>("properties/all", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}${ENDPOINTS.ALL_PROPERTIES}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      toastMessage({
        type: "error",
        content: `Cannot get all Properties' data`,
        duration: 5,
      });
      return rejectWithValue({ message: errorMessage });
    }

    const apiResponse = await response.json();

    if (!apiResponse.succcess) {
      toastMessage({
        type: "error",
        content: `Cannot get all properties' data`,
        duration: 5,
      });

      return rejectWithValue({ message: `Cannot get all properties' data` });
    }

    return apiResponse.data.properties;
  } catch (error) {
    return rejectWithValue({ message: "An error occurred" });
  }
});

export const deleteProperty = createAsyncThunk<
  void,
  string,
  { rejectValue: ApiError }
>("properties/delete", async (property_Id, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}${ENDPOINTS.DELETE_PROPERTY}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ _id: property_Id }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      toastMessage({
        type: "error",
        content: `Cannot delete property with ID ${property_Id}`,
        duration: 5,
      });
      return rejectWithValue({ message: errorMessage });
    }

    const apiResponse = await response.json();

    if (!apiResponse.succcess) {
      toastMessage({
        type: "error",
        content: `Cannot delete property`,
        duration: 5,
      });
      return rejectWithValue({ message: `Cannot delete property ` });
    }

    toastMessage({
      type: "success",
      content: `Property deleted successfully`,
      duration: 5,
    });

    return;
  } catch (error) {
    return rejectWithValue({ message: "An error occurred" });
  }
});

// approved property
export const approvedProperty = createAsyncThunk<
  void,
  { propertyId: string; approved: boolean },
  { rejectValue: ApiError }
>(
  "properties/approved",
  async ({ propertyId, approved }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}${ENDPOINTS.UPDATE_PROPERTY}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ property_id: propertyId, approved: approved }),
      });
      if (!response.ok) {
        const errorMessage = response.statusText;
        toastMessage({
          type: "error",
          content: `Cannot update property`,
          duration: 5,
        });
        return rejectWithValue({ message: errorMessage });
      }
      toastMessage({
        type: "success",
        content: `Property status updated`,
        duration: 5,
      });

      return;
    } catch (error) {
      return rejectWithValue({ message: "An error occurred" });
    }
  }
);
