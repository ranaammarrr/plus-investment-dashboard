import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, ENDPOINTS } from "../../Utils/constants";
import { getToken, toastMessage } from "../../Utils/helperFunctions";
import { ApiError,User } from "./types";
const token = getToken()
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
       

        return apiResponse.data; 
      } catch (error) {
        return rejectWithValue({ message: 'An error occurred' });
      }
    }
  );

  export const deleteUser = createAsyncThunk<void, string, { rejectValue: ApiError }>(
    'user/delete',
    async (userId, { rejectWithValue }) => {
      try {
        const response = await fetch(`${BASE_URL}${ENDPOINTS.DELETE_USER}${userId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
          },
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          toastMessage({
            type: 'error',
            content: `Error while deleting user`,
            duration: 5,
          });
          return rejectWithValue({ message: errorMessage });
        }

        const apiResponse = await response.json();
        // console.log(apiResponse,"delelteeeeee")

        if (!apiResponse.success) {
          toastMessage({
            type: 'error',
            content: `Error while deleting user`,
            duration: 5,
          });
          return rejectWithValue({ message: `Error while deleting user` });
        }

        toastMessage({
          type: 'success',
          content: `User deleted successfully`,
          duration: 5,
        });

        return; // No need to return any data for successful deletion
      } catch (error) {
        return rejectWithValue({ message: 'An error occurred' });
      }
    }
  );

  // Approved users .... 

  export const isVerifiedUser = createAsyncThunk<void, { user_id: string, isVerified: string }, { rejectValue: ApiError }>(
    'properties/approved',
    async ({ user_id }, { rejectWithValue }) => {
      try {
        const response = await fetch(`${BASE_URL}${ENDPOINTS.IS_VERIFIED_USER}/${user_id}`, {
          method:"POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        if (!response.ok) {
          const errorMessage = response;
          toastMessage({
            type: 'error',
            content: `Cannot update user`,
            duration: 5,
          });
          return rejectWithValue({ message: errorMessage });
        }
        toastMessage({
          type: 'success',
          content: `User status updated`,
          duration: 5,
        });
  
        return; 
      } catch (error) {
        return rejectWithValue({ message: 'An error occurred' });
      }
    }
  );