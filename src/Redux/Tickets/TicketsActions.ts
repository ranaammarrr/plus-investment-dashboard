import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, ENDPOINTS } from "../../Utils/constants";
import { getToken, toastMessage } from "../../Utils/helperFunctions";
import { ApiError, Tickets } from "./types";


const token =  getToken()

export const getAllTickets = createAsyncThunk<Tickets[], void,{ rejectValue: ApiError }>(
    'properties/all',
   async (_, { rejectWithValue })  => { 
        try {
        const response = await fetch(`${BASE_URL}${ENDPOINTS.GET_ALL_TICKETS}`, {
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
            content: `Cannot get all Tickets' data`, 
            duration: 5, 
          });
          return rejectWithValue({ message: errorMessage });
        }
        const apiResponse = await response.json();
        console.log("t",apiResponse)
        
  
        if (!apiResponse.success) {
          toastMessage({
            type: 'error', 
            content: `Cannot get all Tickets' data`, 
            duration: 5, 
          });
      
          return rejectWithValue({ message: `Cannot get all Tickets' data`});
        }
       

        return apiResponse.data; 
      } catch (error) {
        return rejectWithValue({ message: 'An error occurred' });
      }
    }
  );