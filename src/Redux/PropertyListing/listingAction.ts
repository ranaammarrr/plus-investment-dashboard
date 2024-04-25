import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, ENDPOINTS } from "../../Utils/constants";
import { getToken, toastMessage } from "../../Utils/helperFunctions";
import { ApiError,Property } from "./types";

const token =  getToken()

export const getAllProperties = createAsyncThunk<Property[], void,{ rejectValue: ApiError }>(
    'properties/all',
   async (_, { rejectWithValue })  => { 
        try {
        const response = await fetch(`${BASE_URL}${ENDPOINTS.ALL_PROPERTIES}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          const errorMessage = await response.text();
          toastMessage({
            type: 'error', 
            content: `Cannot get all Properties' data`, 
            duration: 5, 
          });
          return rejectWithValue({ message: errorMessage });
        }
  
        const apiResponse = await response.json();
        
        console.log("api",apiResponse.data.properties)
  
        if (!apiResponse.succcess) {
          toastMessage({
            type: 'error', 
            content: `Cannot get all properties' data`, 
            duration: 5, 
          });
      
          return rejectWithValue({ message: `Cannot get all properties' data`});
        }
       

        return apiResponse.data.properties; 
      } catch (error) {
        return rejectWithValue({ message: 'An error occurred' });
      }
    }
  );

  export const deleteProperty = createAsyncThunk<void, string, { rejectValue: ApiError }>(
    'properties/delete',
    async (property_Id, { rejectWithValue }) => {
      console.log(property_Id)
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
        console.log(apiResponse,"delelteeeeee")
  
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
  
