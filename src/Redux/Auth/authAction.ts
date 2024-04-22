
import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, LoginCredentials, ApiError } from './types';
import { BASE_URL, ENDPOINTS } from '../../Utils/constants';
import { toastMessage } from '../../Utils/helperFunctions';

export const loginUser = createAsyncThunk<User, LoginCredentials, { rejectValue: ApiError }>(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
      console.log(credentials);
      try {
        const response = await fetch(`${BASE_URL}${ENDPOINTS.LOGIN}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
  
        if (!response.ok) {
          const errorMessage = await response.text();
          return rejectWithValue({ message: errorMessage });
        }
  
        const apiResponse = await response.json();
  
        if (!apiResponse.success) {

          toastMessage({
            type: 'error', 
            content: 'Login failed. Email or password not correct', 
            duration: 5, 
          });
      
          return rejectWithValue({ message: 'Login failed. Email or password not correct' });
        }
        console.log(apiResponse.data)
        localStorage.setItem("token", apiResponse.data.token)
        localStorage.setItem("user", JSON.stringify(apiResponse.data))
        toastMessage({
          type: 'success', 
          content: 'Login successfull!', 
          duration: 3, 
        });

        return apiResponse.data; 
      } catch (error) {
        return rejectWithValue({ message: 'An error occurred during login' });
      }
    }
  );
  
  
