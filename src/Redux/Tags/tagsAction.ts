import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, ENDPOINTS } from "../../Utils/constants";
import { getToken, toastMessage } from "../../Utils/helperFunctions";
import { ApiError, Body, Tags} from "./types";

const token =  getToken()

export const getAllPropertyTags = createAsyncThunk<Tags[], void,{ rejectValue: ApiError }>(
    'timeline/all',
    async (_, { rejectWithValue })  => { 
        try {
        const response = await fetch(`${BASE_URL}${ENDPOINTS.GET_ALL_PROPERTY_TAGS}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization' : `Bearer ${token}`
          },
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          toastMessage({
            type: 'error', 
            content: `Cannot get all tag' data`, 
            duration: 5, 
          });
          return rejectWithValue({ message: errorMessage });
        }

        const apiResponse = await response.json();


        if (!apiResponse.succcess) {
          toastMessage({
            type: 'error', 
            content: `Cannot get all tag' data`, 
            duration: 5, 
          });

          return rejectWithValue({ message: `Cannot get all tag' data`});
        }


        return apiResponse.data.tags; 
      } catch (error) {
        return rejectWithValue({ message: 'An error occurred' });
      }
    }
  );


//   post Tags... 

export const postTags = createAsyncThunk<Tags, Body ,{ rejectValue: ApiError }>(
    'category/create',
    async ({tagName}, { rejectWithValue })  => { 

        const body = {tagName: tagName,}
        try {
        const response = await fetch(`${BASE_URL}${ENDPOINTS.POST_ALL_TAGS}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
          },
          body: JSON.stringify(body)
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          toastMessage({
            type: 'error', 
            content: `Cannot post all tag' data`, 
            duration: 5, 
          });
          return rejectWithValue({ message: errorMessage });
        }

        const apiResponse = await response.json();


        if (!apiResponse.success) {
          toastMessage({
            type: 'error', 
            content: `Cannot post all tag' data`, 
            duration: 5, 
          });

          return rejectWithValue({ message: `Cannot post all tag' data`});
        }

        toastMessage({
            type: 'success', 
            content: `Tag created successfully`, 
            duration: 5, 
          });

        return apiResponse.data; 
      } catch (error) {
        return rejectWithValue({ message: 'An error occurred' });
      }
    }
  );


//   delete Tag ... 

export const deleteTag = createAsyncThunk<void, any, { rejectValue: ApiError }>(
    'properties/delete',
    async ({tag_id}, { rejectWithValue }) => {
      try {
        const response = await fetch(`${BASE_URL}${ENDPOINTS.DELETE_TAG}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
          },
          body: JSON.stringify({tag_id})
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          toastMessage({
            type: 'error',
            content: `Cannot delete tag with ID ${tag_id}`,
            duration: 5,
          });
          return rejectWithValue({ message: errorMessage });
        }

        const apiResponse = await response.json();

        if (!apiResponse.success) {
          toastMessage({
            type: 'error',
            content: `Cannot delete tag`,
            duration: 5,
          });
          return rejectWithValue({ message: `Cannot delete tag ` });
        }

        toastMessage({
          type: 'success',
          content: `Tag deleted successfully`,
          duration: 5,
        });

        return; 
      } catch (error) {
        return rejectWithValue({ message: 'An error occurred' });
      }
    }
  );