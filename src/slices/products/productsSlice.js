import {
  AddCrowdfunding,
  AddProduct,
  DeleteCrowdfunding,
  DeleteProduct,
  GetAllCrowdfunding,
  GetAllProducts,
  GetAllPublicCrowdfunding,
  GetAllPublicProducts,
  GetCrowdfundingById,
  GetProductById,
  UpdateCrowdfunding,
  UpdateProduct,
} from "@/services/products/productService";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getAllProductsAsync = createAsyncThunk(
  "products/all",
  async ({ page, query }) => {
    const response = await GetAllProducts(page, query);
    return response;
  }
);

export const getAllPublicProductsAsync = createAsyncThunk(
  "products/public/all",
  async ({ page, query }) => {
    const response = await GetAllPublicProducts(page, query);
    return response;
  }
);

export const getProductByIdAsync = createAsyncThunk(
  "product/by/id",
  async ({ product_id }) => {
    const response = await GetProductById(product_id);
    return response;
  }
);

export const addProductsAsync = createAsyncThunk(
  "product/add",
  async ({ values }, { rejectWithValue }) => {
    try {
      const resData = await AddProduct(values);
      return resData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/update",
  async ({ product_id, payload }, { rejectWithValue }) => {
    try {
      const resData = await UpdateProduct(product_id, payload);
      return resData;
    } catch (error) {
      // Check if the error has a payload with messages
      const errorMessages = [];

      if (error.payload) {
        for (const field in error.payload) {
          if (Object.prototype.hasOwnProperty.call(error.payload, field)) {
            const messages = Array.isArray(error.payload[field])
              ? error.payload[field].map((message) => `${field}: ${message}`)
              : [`${field}: ${error.payload[field]}`]; // Handle string case

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

export const deleteProductAsync = createAsyncThunk(
  "product/delete",
  async ({ product_id }) => {
    const response = await DeleteProduct(product_id);
    return response;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    getAllProductsResponse: {},
    getAllPublicProductsResponse: {},
    getProductByIdResponse: {},
    addProductResponse: {},
    updateProductResponse: {},
    deleteProductResponse: {},
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProductsAsync.fulfilled, (state, action) => {
      state.getAllProductsResponse = action.payload;
    });

    builder.addCase(getAllProductsAsync.rejected, (state, action) => {
      state.getAllProductsResponse = action.payload;
    });

    builder.addCase(getAllPublicProductsAsync.fulfilled, (state, action) => {
      state.getAllPublicProductsResponse = action.payload;
    });

    builder.addCase(getAllPublicProductsAsync.rejected, (state, action) => {
      state.getAllPublicProductsResponse = action.payload;
    });

    builder.addCase(addProductsAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.addProductResponse = action.payload;

        // Ensure getAllCrowdfundingResponse is initialized
        if (!state.getAllProductsResponse) {
          state.getAllProductsResponse = { data: [] };
        }

        state.getAllProductsResponse.data.unshift({
          id: action.payload?.data?.id,
          description: action.payload?.data?.description,
          name: action.payload?.data?.name,
          goal: action.payload?.data?.goal,
          model: action.payload?.data?.model,
          duration: action?.payload?.data?.duration,
        });

        toast.success(action.payload.message);
      }
    });

    builder.addCase(addProductsAsync.rejected, (state, action) => {
      toast.error(action.payload.message);
      state.addProductResponse = action.payload;
    });

    builder.addCase(updateProductAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.updateProductResponse = action.payload;
        state.getAllProductsResponse.data =
          state.getAllProductsResponse.data.map((fund) =>
            fund.id === action?.payload?.data?.id
              ? {
                  id: action.payload?.data?.id,
                  description: action.payload?.data?.description,
                  name: action.payload?.data?.name,
                  goal: action.payload?.data?.goal,
                  model: action.payload?.data?.model,
                  duration: action?.payload?.data?.duration,
                }
              : fund
          );

        toast.success(action.payload.message);
      }
    });

    builder.addCase(updateProductAsync.rejected, (state, action) => {
      state.updateProductResponse = action.payload;
      toast.error("Update failed");
    });

    builder.addCase(getProductByIdAsync.fulfilled, (state, action) => {
      state.getProductByIdResponse = action.payload;
    });

    builder.addCase(getProductByIdAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
      state.getProductByIdResponse = action.payload;
    });

    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      state.deleteProductResponse = action.payload;
      toast.success(action?.payload?.message);
    });

    builder.addCase(deleteProductAsync.rejected, (state, action) => {
      state.deleteProductResponse = action.payload;
      toast.error(action?.payload?.message);
    });
  },
});

export default productSlice.reducer;
