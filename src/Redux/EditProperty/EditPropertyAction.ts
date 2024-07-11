import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, ENDPOINTS } from "../../Utils/constants";
import { getToken, toastMessage } from "../../Utils/helperFunctions";
import { Add, ApiError, Edit } from "./types";


interface EditPropertyData {
  property_id?: string;
  type?: string;
  name?: string;
  address?: string;
  postalCode?: number;
  roomNo?: string;
  bathNo?: string;
  price?: string;
  detail:string;
}
interface AddPropertyData {
  // image: any;
  user_id: string;
  type: string;
  name: string;
  address: string;
  postalCode: number;
  roomNo: string;
  bathNo: string;
  price: string;
  lat: number;
  lng: number;
  [key: string]: any;
  image: any;
}

const token =  getToken()

export const editProperty = createAsyncThunk<Edit[], EditPropertyData, { rejectValue: ApiError }>(
  'editProperty/all',
  async (requestData, { rejectWithValue }) => { 
    try {
      const response = await fetch(`${BASE_URL}${ENDPOINTS.EDIT_PROPERTY}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
          },
        body: JSON.stringify(requestData), 
    });

      if (!response.ok) {
        const errorMessage = await response.text();
        toastMessage({
          type: 'error', 
          content: `Cannot edit property`, 
          duration: 5, 
        });
        return rejectWithValue({ message: errorMessage });
      }

      const apiResponse = await response.json();

      if (!apiResponse.succcess) {
        toastMessage({
          type: 'error', 
          content: `Cannot edit property`, 
          duration: 5, 
        });
        return rejectWithValue({ message: `Cannot edit property`});
      }

      return apiResponse.data; 
    } catch (error) {
      return rejectWithValue({ message: 'An error occurred' });
    }
  }
);

export const addProperty = createAsyncThunk<Add[], AddPropertyData, { rejectValue: ApiError }>(
  'property/add',
  async (data, { rejectWithValue }) => { 
    try {
      const formData = new FormData();
      // Append non-image data fields
      Object.keys(data).forEach(key => {
        if (key !== 'image') {
          formData.append(key, data[key]);
        }
      });

      // Append image file if it exists in the data
      // let images = data.image.map((item: any) => (item))
      if (data.image) {
        data.image.forEach((file: File) => {
          formData.append('image', file);
        });
      }

      const response = await fetch(`${BASE_URL}${ENDPOINTS.ADD_PROPERTY}`, {
        method: 'POST',
        headers: {
            'Authorization' : `Bearer ${token}`,
            // 'Content-Type' : "multipart/form-data; boundary="
          },
        body: formData, 
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        toastMessage({
          type: 'error', 
          content: `Cannot add property`, 
          duration: 5, 
        });
        return rejectWithValue({ message: errorMessage });
      }

      const apiResponse = await response.json();

      if (!apiResponse.success) {
        toastMessage({
          type: 'error', 
          content: `Cannot add property`, 
          duration: 5, 
        });
        return rejectWithValue({ message: `Cannot add property` });
      }

      toastMessage({
        type: 'success', 
        content: `Property Added`, 
        duration: 5, 
      });
      return apiResponse.data; 
    } catch (error) {
      return rejectWithValue({ message: 'An error occurred' });
    }
  }
);

