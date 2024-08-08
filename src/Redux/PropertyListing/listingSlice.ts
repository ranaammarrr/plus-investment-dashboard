import { createSlice } from "@reduxjs/toolkit";
import {
  deleteProperty,
  getAllProperties,
  getPropertyDetail,
} from "./listingAction";
import { PropertiesDetailState, PropertiesState } from "./types";

const initialState: PropertiesState = {
  properties: [],
  isLoading: false,
  error: null,
};

const initialDetailState: PropertiesDetailState = {
  propertiesDetail: {
    succcess: false,
    details: "",
    _id: "",
    name: "",
    title: "",
    detail: "",
    address: "",
    postalCode: "",
    type: "",
    approved: true,
    isFeatured: false,
    user: {
      name: "",
      company: "",
      role: "",
    },
    company: "",
  },
  detailedProperty: null,
  isLoading: false,
  error: null,
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProperties.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllProperties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.properties = action.payload;
      })
      .addCase(getAllProperties.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "An error occurred.";
      })
      .addCase(deleteProperty.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "An error occurred while deleting the property.";
      });
  },
});

const propertyDetailSlice = createSlice({
  name: "propertyDetail",
  initialState: initialDetailState,
  reducers: {
    addPropertyDetail: (state, action) => {
      // If detailedProperty is null, initialize it as an empty array
      if (state.detailedProperty === null) {
        state.detailedProperty = null;
      }
      state.detailedProperty = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPropertyDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPropertyDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.propertiesDetail = action.payload;
      })
      .addCase(getPropertyDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "An error occurred while fetching the property detail.";
      });
  },
});

export const { addPropertyDetail } = propertyDetailSlice.actions;

export const propertyReducer = propertySlice.reducer;
export const propertyDetailReducer = propertyDetailSlice.reducer;
