import {
  AddCrowdfunding,
  DeleteCrowdfunding,
  GetAllCrowdfunding,
  GetAllPublicCrowdfunding,
  GetCrowdfundingById,
  UpdateCrowdfunding,
} from "@/services/crowdfunding/crowdfundingService";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getAllCrowdfundingAsync = createAsyncThunk(
  "crowdfunding/all",
  async ({ page, query }) => {
    const response = await GetAllCrowdfunding(page, query);
    return response;
  }
);

export const getAllPublicCrowdfundingAsync = createAsyncThunk(
  "crowdfunding/public/all",
  async ({ page, query }) => {
    const response = await GetAllPublicCrowdfunding(page, query);
    return response;
  }
);

export const getCrowdfundingByIdAsync = createAsyncThunk(
  "crowdfunding/by/id",
  async ({ crowdfunding_id }) => {
    const response = await GetCrowdfundingById(crowdfunding_id);
    return response;
  }
);

export const addCrowdfundingAsync = createAsyncThunk(
  "crowdfunding/add",
  async ({ values }, { rejectWithValue }) => {
    try {
      const resData = await AddCrowdfunding(values);
      return resData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateCrowdfundingAsync = createAsyncThunk(
  "crowdfunding/update",
  async ({ crowdfunding_id, payload }, { rejectWithValue }) => {
    try {
      const resData = await UpdateCrowdfunding(crowdfunding_id, payload);
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

export const deleteCrowdfundingAsync = createAsyncThunk(
  "crowdfunding/delete",
  async ({ crowdfunding_id }) => {
    const response = await DeleteCrowdfunding(crowdfunding_id);
    return response;
  }
);

const crowdfundingSlice = createSlice({
  name: "crowdfunding",
  initialState: {
    getAllCrowdfundingResponse: {},
    getAllPublicCrowdfundingResponse: {},
    getCrowdfundingByIdResponse: {},
    addCrowdfundingResponse: {},
    updateCrowdfundingResponse: {},
    deleteCrowdfundingResponse: {},
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCrowdfundingAsync.fulfilled, (state, action) => {
      state.getAllCrowdfundingResponse = action.payload;
    });

    builder.addCase(getAllCrowdfundingAsync.rejected, (state, action) => {
      state.getAllCrowdfundingResponse = action.payload;
    });

    builder.addCase(
      getAllPublicCrowdfundingAsync.fulfilled,
      (state, action) => {
        state.getAllPublicCrowdfundingResponse = action.payload;
      }
    );

    builder.addCase(getAllPublicCrowdfundingAsync.rejected, (state, action) => {
      state.getAllPublicCrowdfundingResponse = action.payload;
    });

    builder.addCase(addCrowdfundingAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.addCrowdfundingResponse = action.payload;

        // Ensure getAllCrowdfundingResponse is initialized
        if (!state.getAllCrowdfundingResponse) {
          state.getAllCrowdfundingResponse = { data: [] };
        }

        state.getAllCrowdfundingResponse.data.unshift({
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

    builder.addCase(addCrowdfundingAsync.rejected, (state, action) => {
      toast.error(action.payload.message);
      state.addCrowdfundingResponse = action.payload;
    });

    builder.addCase(updateCrowdfundingAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.updateCrowdfundingResponse = action.payload;
        state.getAllCrowdfundingResponse.data =
          state.getAllCrowdfundingResponse.data.map((fund) =>
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

    builder.addCase(updateCrowdfundingAsync.rejected, (state, action) => {
      state.updateCrowdfundingResponse = action.payload;
      toast.error("Update failed");
    });

    builder.addCase(getCrowdfundingByIdAsync.fulfilled, (state, action) => {
      state.getCrowdfundingByIdResponse = action.payload;
    });

    builder.addCase(getCrowdfundingByIdAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
      state.getCrowdfundingByIdResponse = action.payload;
    });

    builder.addCase(deleteCrowdfundingAsync.fulfilled, (state, action) => {
      state.deleteCrowdfundingResponse = action.payload;
      toast.success(action?.payload?.message);
    });

    builder.addCase(deleteCrowdfundingAsync.rejected, (state, action) => {
      state.deleteCrowdfundingResponse = action.payload;
      toast.error(action?.payload?.message);
    });
  },
});

export default crowdfundingSlice.reducer;
