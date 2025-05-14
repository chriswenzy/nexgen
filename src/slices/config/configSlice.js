import {
  AddCategory,
  DeleteCategory,
  GetAllCategories,
  GetCategories,
  UpdateCategory,
} from "@/services/config/configService";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getAllCategoriesAsync = createAsyncThunk(
  "category/all",
  async () => {
    const response = await GetAllCategories();
    return response;
  }
);

export const getCategoriesAsync = createAsyncThunk("categories", async () => {
  const response = await GetCategories();
  return response;
});

export const addCategoriesAsync = createAsyncThunk(
  "category/add",
  async ({ values }, { rejectWithValue }) => {
    try {
      const resData = await AddCategory(values);
      return resData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateCategoryAsync = createAsyncThunk(
  "category/update",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const resData = await UpdateCategory(id, values);
      return resData;
    } catch (error) {
      // Check if the error has a payload with messages
      const errorMessages = [];

      if (error.payload) {
        for (const field in error.payload) {
          if (Object.prototype.hasOwnProperty.call(error.payload, field)) {
            const messages = Array.isArray(error.payload[field])
              ? error.payload[field].map((message) => `${field}: ${message}`)
              : [`${field}: ${error.payload[field]}`];
            errorMessages.push(...messages);
          }
        }
      }

      // Return formatted error messages for the reducer to handle
      return rejectWithValue(
        errorMessages.length > 0
          ? errorMessages
          : ["An unknown error occurred."]
      );
    }
  }
);

export const deleteCategoryAsync = createAsyncThunk(
  "category/delete",
  async ({ category_id }) => {
    const response = await DeleteCategory(category_id);
    return response;
  }
);

const configSlice = createSlice({
  name: "config",
  initialState: {
    getAllCategoriesResponse: {},
    getCategoriesResponse: {},
    updateCategoryResponse: {},
    addCategoriesResponse: {},
    deleteCategoryResponse: {},
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategoriesAsync.fulfilled, (state, action) => {
      state.getAllCategoriesResponse = action.payload;
    });

    builder.addCase(addCategoriesAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.addCategoriesResponse = action.payload;
        state.getAllCategoriesResponse?.data?.unshift({
          id: action.payload?.data?.id,
          name: action.payload?.data?.name,
          description: action.payload?.data?.description,
        });

        toast.success(action.payload.message);
      }
    });
    builder.addCase(addCategoriesAsync.rejected, (state, action) => {
      state.addCategoriesResponse = action.payload;
      toast.error(action.payload.message);
    });

    builder.addCase(updateCategoryAsync.fulfilled, (state, action) => {
      state.updateCategoryResponse = action.payload;
      toast.success(action.payload.message);
    });
    builder.addCase(updateCategoryAsync.rejected, (state, action) => {
      state.updateCategoryResponse = action.payload;
      toast.error("Update failed");
    });

    builder.addCase(getCategoriesAsync.fulfilled, (state, action) => {
      state.getCategoriesResponse = action.payload;
    });
    builder.addCase(getCategoriesAsync.rejected, (state, action) => {
      state.getCategoriesResponse = action.payload;
      toast.error(action?.payload?.message);
    });

    builder.addCase(deleteCategoryAsync.fulfilled, (state, action) => {
      state.deleteCategoryResponse = action.payload;
      toast.success(action?.payload?.message);
    });

    builder.addCase(deleteCategoryAsync.rejected, (state, action) => {
      state.deleteCategoryResponse = action.payload;
      toast.error(action?.payload?.message);
    });
  },
});

export default configSlice.reducer;
