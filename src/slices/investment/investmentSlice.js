import {
  AddInvestment,
  DeleteInvestment,
  GetAllInvestments,
  GetAllPublicInvestments,
  GetInvestmentById,
  UpdateInvestment,
} from "@/services/investment/investmentService";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getAllInvestmentsAsync = createAsyncThunk(
  "investment/all",
  async ({ page, query }) => {
    const response = await GetAllInvestments(page, query);
    return response;
  }
);

export const getAllPublicInvestmentsAsync = createAsyncThunk(
  "investment/public/all",
  async ({ page, query }) => {
    const response = await GetAllPublicInvestments(page, query);
    return response;
  }
);

export const getInvestmentsByIdAsync = createAsyncThunk(
  "investment/by/id",
  async ({ investments_id }) => {
    const response = await GetInvestmentById(investments_id);
    return response;
  }
);

export const addInvestmentsAsync = createAsyncThunk(
  "investment/add",
  async ({ values }, { rejectWithValue }) => {
    try {
      const resData = await AddInvestment(values);
      return resData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateInvestmentsAsync = createAsyncThunk(
  "investment/update",
  async ({ investments_id, payload }, { rejectWithValue }) => {
    try {
      const resData = await UpdateInvestment(investments_id, payload);
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

export const deleteInvestmentsAsync = createAsyncThunk(
  "investment/delete",
  async ({ investments_id }) => {
    const response = await DeleteInvestment(investments_id);
    return response;
  }
);

const InvestmentSlice = createSlice({
  name: "investment",
  initialState: {
    getAllInvestmentResponse: {},
    getAllPublicInvestmentResponse: {},
    getInvestmentByIdResponse: {},
    addInvestmentResponse: {},
    updateInvestmentResponse: {},
    deleteInvestmentResponse: {},
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllInvestmentsAsync.fulfilled, (state, action) => {
      state.getAllInvestmentResponse = action.payload;
    });

    builder.addCase(getAllInvestmentsAsync.rejected, (state, action) => {
      state.getAllInvestmentResponse = action.payload;
    });

    builder.addCase(getAllPublicInvestmentsAsync.fulfilled, (state, action) => {
      state.getAllPublicInvestmentResponse = action.payload;
    });

    builder.addCase(getAllPublicInvestmentsAsync.rejected, (state, action) => {
      state.getAllPublicInvestmentResponse = action.payload;
    });

    builder.addCase(addInvestmentsAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.addInvestmentResponse = action.payload;
        state.getAllInvestmentResponse.data.unshift({
          id: action.payload?.data?.id,
          name: action.payload?.data?.name,
          start_date: action.payload?.data?.start_date,
          investment_type: action.payload?.data?.investment_type,
          amount: action.payload?.data?.amount,
          return_on_investments: action?.payload?.data?.return_on_investments,
        });

        toast.success(action.payload.message);
      }
    });
    builder.addCase(addInvestmentsAsync.rejected, (state, action) => {
      toast.error(action.payload.message);
      state.addInvestmentResponse = action.payload;
    });

    builder.addCase(updateInvestmentsAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.updateInvestmentResponse = action.payload;
        state.getAllInvestmentResponse.data =
          state.getAllInvestmentResponse.data.map((investment) =>
            investment.id === action.payload?.data?.id
              ? {
                  id: action.payload?.data?.id,
                  name: action.payload?.data?.name,
                  start_date: action.payload?.data?.start_date,
                  investment_type: action.payload?.data?.investment_type,
                  amount: action.payload?.data?.amount,
                  return_on_investments:
                    action?.payload?.data?.return_on_investments,
                }
              : investment
          );

        toast.success(action.payload.message);
      }
    });

    builder.addCase(updateInvestmentsAsync.rejected, (state, action) => {
      state.updateInvestmentResponse = action.payload;
      toast.error("Update failed");
    });

    builder.addCase(getInvestmentsByIdAsync.fulfilled, (state, action) => {
      state.getInvestmentByIdResponse = action.payload;
    });

    builder.addCase(getInvestmentsByIdAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
      state.getInvestmentByIdResponse = action.payload;
    });

    builder.addCase(deleteInvestmentsAsync.fulfilled, (state, action) => {
      state.deleteInvestmentResponse = action.payload;
      toast.success(action?.payload?.message);
    });

    builder.addCase(deleteInvestmentsAsync.rejected, (state, action) => {
      state.deleteInvestmentResponse = action.payload;
      toast.error(action?.payload?.message);
    });
  },
});

export default InvestmentSlice.reducer;
