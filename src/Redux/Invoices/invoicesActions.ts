import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, ENDPOINTS } from "../../Utils/constants";
import { getToken, toastMessage } from "../../Utils/helperFunctions";
import { ApiError, InvoicesById,  } from "./types";

const token =  getToken()


export const getInvoicesById = createAsyncThunk<InvoicesById, string, { rejectValue: ApiError }>(
    'invoices/getInvoicesByUserId',
    async (_id, { rejectWithValue }) => {
      try {
        const response = await fetch(`${BASE_URL}${ENDPOINTS.GET_INVOICES_BY_ID}/${_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Ensure `token` is defined and accessible
          },
        });
  
        if (!response.ok) {
          const errorMessage = await response.text();
          toastMessage({
            type: 'error',
            content: `Cannot fetch invoices details with ID ${_id}`,
            duration: 5,
          });
          return rejectWithValue({ message: errorMessage });
        }
  
        const apiResponse = await response.json();
  
        if (!apiResponse.success) { // Ensure `apiResponse` has a `success` field if applicable
          toastMessage({
            type: 'error',
            content: `Cannot fetch invoices details`,
            duration: 5,
          });
          return rejectWithValue({ message: `Cannot fetch invoices details` });
        }
  
        // toastMessage({
        //   type: 'success',
        //   content: `Property details fetched successfully`,
        //   duration: 5,
        // });
       
        return apiResponse.data; // Return the property details
      } catch (error) {
        return rejectWithValue({ message: 'An error occurred' });
      }
    }
  );