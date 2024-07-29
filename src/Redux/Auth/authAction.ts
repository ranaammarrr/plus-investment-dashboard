import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  User,
  LoginCredentials,
  ApiError,
  changePasswordCredentials,
  ApiErrors,
} from "./types";
import { BASE_URL, ENDPOINTS } from "../../Utils/constants";
import { getToken, toastMessage } from "../../Utils/helperFunctions";

const token = getToken();
export const loginUser = createAsyncThunk<
  User,
  LoginCredentials,
  { rejectValue: ApiError }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}${ENDPOINTS.LOGIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      return rejectWithValue({
        message: errorMessage,
        role: "",
      });
    }

    const apiResponse = await response.json();

    if (!apiResponse.success) {
      // Handle failed login (incorrect credentials)
      toastMessage({
        type: "error",
        content: "Login failed. Email or password not correct",
        duration: 5,
      });
      return rejectWithValue({
        message: "Login failed. Email or password not correct",
        role: "",
      });
    }

    // Successful login
    localStorage.setItem("token", apiResponse.data.token);
    localStorage.setItem("user", JSON.stringify(apiResponse.data));

    if (apiResponse.data.role !== "admin") {
      // Not an admin user
      toastMessage({
        type: "error",
        content: "Not an Admin user!",
        duration: 3,
      });
      return rejectWithValue({
        message: "Not an admin user!",
        role: "User",
      });
    } else {
      // Admin user
      toastMessage({
        type: "success",
        content: "Login successful!",
        duration: 3,
      });
      return apiResponse.data;
    }
  } catch (error) {
    // Error during login attempt
    return rejectWithValue({
      message: "An error occurred during login",
      role: "",
    });
  }
});

// change password ....

export const changePassword = createAsyncThunk<
  void,
  string,
  { rejectValue: ApiErrors }
>("user/changePassword", async (body: any, { rejectWithValue }) => {
  try {
    const data = {
      oldPassword: body.oldPassword.toString(),
      newPassword: body.newPassword.toString(),
      confirmPassword: body.confirmPassword.toString(),
    };

    const response = await fetch(`${BASE_URL}${ENDPOINTS.CHANGE_PASSWORD}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      // toastMessage({
      //   type: "error",
      //   content: `Cannot change password`,
      //   duration: 5,
      // });
      return rejectWithValue({ message: errorMessage });
    }

    const apiResponse = await response.json();

    if (!apiResponse.success) {
      toastMessage({
        type: "error",
        content: `Cannot change password`,
        duration: 5,
      });
      return rejectWithValue({ message: `Cannot change password ` });
    }

    toastMessage({
      type: "success",
      content: `Password changes successfully`,
      duration: 5,
    });

    return;
  } catch (error) {
    return rejectWithValue({ message: "An error occurred" });
  }
});
