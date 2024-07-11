import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, ENDPOINTS } from "../../Utils/constants";
import { getToken, toastMessage } from "../../Utils/helperFunctions";
import { ApiError,PropertiesDetailState,Property, PropertyDetail } from "./types";

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

  // Get porperty PropertyDetails ... 

  export const getPropertyDetail = createAsyncThunk<PropertyDetail, string, { rejectValue: ApiError }>(
    'properties/getPropertyDetail',
    async (property_Id, { rejectWithValue }) => {
      try {
        const response = await fetch(`${BASE_URL}${ENDPOINTS.GET_PROPERTY_DETAIL}/${property_Id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Ensure `token` is defined and accessible
          },
          // body: JSON.stringify({_id: property_Id})
        });
  
        if (!response.ok) {
          const errorMessage = await response.text();
          toastMessage({
            type: 'error',
            content: `Cannot fetch property details with ID ${property_Id}`,
            duration: 5,
          });
          return rejectWithValue({ message: errorMessage });
        }
  
        const apiResponse: PropertyDetail = await response.json();
  
        if (!apiResponse.succcess) { // Ensure `apiResponse` has a `success` field if applicable
          toastMessage({
            type: 'error',
            content: `Cannot fetch property details`,
            duration: 5,
          });
          return rejectWithValue({ message: `Cannot fetch property details` });
        }
  
        // toastMessage({
        //   type: 'success',
        //   content: `Property details fetched successfully`,
        //   duration: 5,
        // });
  
        return apiResponse.data.properties; // Return the property details
      } catch (error) {
        return rejectWithValue({ message: 'An error occurred' });
      }
    }
  );
  
