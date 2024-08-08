import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, ENDPOINTS } from "../../Utils/constants";
import { getToken, toastMessage } from "../../Utils/helperFunctions";
import { ApiError, InvoicesById } from "./types";

const token = getToken();

export const getInvoicesById = createAsyncThunk<
  InvoicesById,
  string,
  { rejectValue: ApiError }
>("invoices/getInvoicesByUserId", async (_id, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${BASE_URL}${ENDPOINTS.GET_INVOICES_BY_ID}/${_id}`,
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
        content: `Cannot fetch invoices details with ID ${_id}`,
        duration: 5,
      });
      return rejectWithValue({ message: errorMessage });
    }

    const apiResponse = await response.json();

    if (!apiResponse.success) {
      toastMessage({
        type: "error",
        content: `Cannot fetch invoices details`,
        duration: 5,
      });
      return rejectWithValue({ message: `Cannot fetch invoices details` });
    }

    return apiResponse.data;
  } catch (error) {
    return rejectWithValue({ message: "An error occurred" });
  }
});
