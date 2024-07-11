import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, LoginCredentials, ApiError } from './types';
import { BASE_URL, ENDPOINTS } from '../../Utils/constants';
import { toastMessage } from '../../Utils/helperFunctions';

export const loginUser = createAsyncThunk<User, LoginCredentials, { rejectValue: ApiError }>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
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
        return rejectWithValue({
          message: errorMessage,
          role: ''
        });
      }

      const apiResponse = await response.json();

      if (!apiResponse.success) {
        // Handle failed login (incorrect credentials)
        toastMessage({
          type: 'error',
          content: 'Login failed. Email or password not correct',
          duration: 5,
        });
        return rejectWithValue({
          message: 'Login failed. Email or password not correct',
          role: ''
        });
      }

      // Successful login
      localStorage.setItem("token", apiResponse.data.token);
      localStorage.setItem("user", JSON.stringify(apiResponse.data));

      if (apiResponse.data.role !== 'Admin') {
        // Not an admin user
        toastMessage({
          type: 'error',
          content: 'Not an Admin user!',
          duration: 3,
        });
        return rejectWithValue({
          message: 'Not an admin user!',
          role: 'User'
        });
      } else {
        // Admin user
        toastMessage({
          type: 'success',
          content: 'Login successful!',
          duration: 3,
        });
        return apiResponse.data;
      }
    } catch (error) {
      // Error during login attempt
      return rejectWithValue({
        message: 'An error occurred during login',
        role: ''
      });
    }
  }
);
