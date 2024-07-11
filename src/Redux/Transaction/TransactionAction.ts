import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, ENDPOINTS } from "../../Utils/constants";
import { getToken, toastMessage } from "../../Utils/helperFunctions";
import { ApiError, Transctions } from "./types";

const token =  getToken()

export const getAllInvoices = createAsyncThunk<Transctions[], void,{ rejectValue: ApiError }>(
    'transaction/all',
   async (_, { rejectWithValue })  => { 
        try {
        const response = await fetch(`${BASE_URL}${ENDPOINTS.GET_ALL_INVOICES}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
          },
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          toastMessage({
            type: 'error', 
            content: `Cannot get all Transactions' data`, 
            duration: 5, 
          });
          return rejectWithValue({ message: errorMessage });
        }

        const apiResponse = await response.json();


        if (!apiResponse.succcess) {
          toastMessage({
            type: 'error', 
            content: `Cannot get all Transactions' data`, 
            duration: 5, 
          });

          return rejectWithValue({ message: `Cannot get all Transactions' data`});
        }


        return apiResponse.data; 
      } catch (error) {
        return rejectWithValue({ message: 'An error occurred' });
      }
    }
  );

  export const deleteProperty = createAsyncThunk<void, string, { rejectValue: ApiError }>(
    'properties/delete',
    async (property_Id, { rejectWithValue }) => {
      try {
        const response = await fetch(`${BASE_URL}${ENDPOINTS.DELETE_PROPERTY}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
          },
          body: JSON.stringify({_id: property_Id})
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          toastMessage({
            type: 'error',
            content: `Cannot delete property with ID ${property_Id}`,
            duration: 5,
          });
          return rejectWithValue({ message: errorMessage });
        }

        const apiResponse = await response.json();

        if (!apiResponse.success) {
          toastMessage({
            type: 'error',
            content: `Cannot delete property with ID ${property_Id}`,
            duration: 5,
          });
          return rejectWithValue({ message: `Cannot delete property with ID ${property_Id}` });
        }

        toastMessage({
          type: 'success',
          content: `Property with ID ${property_Id} deleted successfully`,
          duration: 5,
        });

        return; // No need to return any data for successful deletion
      } catch (error) {
        return rejectWithValue({ message: 'An error occurred' });
      }
    }
  );