import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, ENDPOINTS } from "../../Utils/constants";
import { toastMessage } from "../../Utils/helperFunctions";
import { ApiError,User } from "./types";

export const getAllUsers = createAsyncThunk<User[], void,{ rejectValue: ApiError }>(
    'users/all',
   async (_, { rejectWithValue })  => { 
        try {
        const response = await fetch(`${BASE_URL}${ENDPOINTS.ALL_USERS}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          const errorMessage = await response.text();
          toastMessage({
            type: 'error', 
            content: `Cannot get all users' data`, 
            duration: 5, 
          });
          return rejectWithValue({ message: errorMessage });
        }
  
        const apiResponse = await response.json();
  
        if (!apiResponse.success) {

          toastMessage({
            type: 'error', 
            content: `Cannot get all users' data`, 
            duration: 5, 
          });
      
          return rejectWithValue({ message: `Cannot get all users' data`});
        }
        console.log(apiResponse.data)
       

        return apiResponse.data; 
      } catch (error) {
        return rejectWithValue({ message: 'An error occurred' });
      }
    }
  );