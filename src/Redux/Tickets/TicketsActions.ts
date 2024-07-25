import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, ENDPOINTS } from "../../Utils/constants";
import { getToken, toastMessage } from "../../Utils/helperFunctions";
import { ApiError, Body, Tickets } from "./types";

const token = getToken();

export const getAllTickets = createAsyncThunk<
  Tickets[],
  void,
  { rejectValue: ApiError }
>("properties/all", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}${ENDPOINTS.GET_ALL_TICKETS}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      toastMessage({
        type: "error",
        content: `Cannot get all Tickets' data`,
        duration: 5,
      });
      return rejectWithValue({ message: errorMessage });
    }
    const apiResponse = await response.json();

    if (!apiResponse.success) {
      toastMessage({
        type: "error",
        content: `Cannot get all Tickets' data`,
        duration: 5,
      });

      return rejectWithValue({ message: `Cannot get all Tickets' data` });
    }

    return apiResponse.data;
  } catch (error) {
    return rejectWithValue({ message: "An error occurred" });
  }
});

// POST CATEGORY API.....

export const createResponse = createAsyncThunk<
  Tickets,
  Body,
  { rejectValue: ApiError }
>("ticket/response", async ({ text, ticketId }, { rejectWithValue }) => {
  const body = { text: text, ticketId: ticketId };
  try {
    const response = await fetch(`${BASE_URL}${ENDPOINTS.PUT_RESPONSE}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      toastMessage({
        type: "error",
        content: `Cannot post all category' data`,
        duration: 5,
      });
      return rejectWithValue({ message: errorMessage });
    }

    const apiResponse = await response.json();

    if (!apiResponse.success) {
      toastMessage({
        type: "error",
        content: `Cannot post all category' data`,
        duration: 5,
      });

      return rejectWithValue({ message: `Cannot post all category' data` });
    }

    toastMessage({
      type: "success",
      content: `Category created successfully`,
      duration: 5,
    });

    return apiResponse.data;
  } catch (error) {
    return rejectWithValue({ message: "An error occurred" });
  }
});
=======
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
