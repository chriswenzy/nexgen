import {
  AddSaving,
  DeleteSaving,
  GetAllPublicSavings,
  GetAllSavings,
  GetSavingById,
  UpdateSaving,
} from "@/services/savings/savingsService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getAllSavingsAsync = createAsyncThunk(
  "savings/all",
  async ({ page, query }) => {
    const response = await GetAllSavings(page, query);
    return response;
  }
);

export const getAllPublicSavingsAsync = createAsyncThunk(
  "savings/public/all",
  async ({ page, query }) => {
    const response = await GetAllPublicSavings(page, query);
    return response;
  }
);

export const getSavingByIdAsync = createAsyncThunk(
  "savings/by/id",
  async ({ savings_id }) => {
    const response = await GetSavingById(savings_id);
    return response;
  }
);

export const addSavingAsync = createAsyncThunk(
  "savings/add",
  async ({ values }, { rejectWithValue }) => {
    try {
      const resData = await AddSaving(values);
      return resData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateSavingAsync = createAsyncThunk(
  "savings/update",
  async ({ savings_id, payload }, { rejectWithValue }) => {
    try {
      const resData = await UpdateSaving(savings_id, payload);
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

export const deleteSavingAsync = createAsyncThunk(
  "savings/delete",
  async ({ savings_id }) => {
    const response = await DeleteSaving(savings_id);
    return response;
  }
);

const SavingsSlice = createSlice({
  name: "savings",
  initialState: {
    getAllSavingResponse: {},
    getAllPublicSavingResponse: {},
    getSavingByIdResponse: {},
    addSavingResponse: {},
    updateSavingResponse: {},
    deleteSavingResponse: {},
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllSavingsAsync.fulfilled, (state, action) => {
      state.getAllSavingResponse = action.payload;
    });

    builder.addCase(getAllSavingsAsync.rejected, (state, action) => {
      state.getAllSavingResponse = action.payload;
    });

    builder.addCase(getAllPublicSavingsAsync.fulfilled, (state, action) => {
      state.getAllPublicSavingResponse = action.payload;
    });

    builder.addCase(getAllPublicSavingsAsync.rejected, (state, action) => {
      state.getAllPublicSavingResponse = action.payload;
    });

    builder.addCase(addSavingAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.addSavingResponse = action.payload;

        // Ensure getAllSavingResponse and data array exist
        if (!state.getAllSavingResponse) {
          state.getAllSavingResponse = { data: [] };
        } else if (!Array.isArray(state.getAllSavingResponse.data)) {
          state.getAllSavingResponse.data = [];
        }

        state.getAllSavingResponse.data.unshift({
          id: action.payload?.data?.id,
          description: action.payload?.data?.description,
          name: action.payload?.data?.name,
          goal: action.payload?.data?.goal,
          model: action.payload?.data?.model,
          duration: action.payload?.data?.duration,
        });

        toast.success(action.payload.message);
      }
    });

    builder.addCase(addSavingAsync.rejected, (state, action) => {
      toast.error(action.payload.message);
      state.addSavingResponse = action.payload;
    });

    builder.addCase(updateSavingAsync.fulfilled, (state, action) => {
      state.updateSavingResponse = action.payload;
      toast.success(action.payload.message);
    });
    builder.addCase(updateSavingAsync.rejected, (state, action) => {
      state.updateSavingResponse = action.payload;
      toast.error("Update failed");
    });

    builder.addCase(getSavingByIdAsync.fulfilled, (state, action) => {
      state.getSavingByIdResponse = action.payload;
    });

    builder.addCase(getSavingByIdAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
      state.getSavingByIdResponse = action.payload;
    });

    builder.addCase(deleteSavingAsync.fulfilled, (state, action) => {
      state.deleteSavingResponse = action.payload;
      toast.success(action?.payload?.message);
    });

    builder.addCase(deleteSavingAsync.rejected, (state, action) => {
      state.deleteSavingResponse = action.payload;
      toast.error(action?.payload?.message);
    });
  },
});

export default SavingsSlice.reducer;
