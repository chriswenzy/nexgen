import {
  AddOrder,
  AddSaving,
  DeleteOrder,
  DeleteSaving,
  GetAllOrders,
  GetAllPublicOrders,
  GetAllPublicSavings,
  GetAllSavings,
  GetOrderById,
  GetSavingById,
  UpdateOrder,
  UpdateOrderStatus,
  UpdateSaving,
} from "@/services/order/orderService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { updateProductAsync } from "../products/productsSlice";

export const getAllOrdersAsync = createAsyncThunk(
  "order",
  async ({ page, query }) => {
    const response = await GetAllOrders(page, query);
    return response;
  }
);

export const getAllPublicOrderAsync = createAsyncThunk(
  "order/all",
  async ({ page, query }) => {
    const response = await GetAllPublicOrders(page, query);
    return response;
  }
);

export const getOrderByIdAsync = createAsyncThunk(
  "order/by/id",
  async ({ order_id }) => {
    const response = await GetOrderById(order_id);
    return response;
  }
);

export const addOrderAsync = createAsyncThunk(
  "order/add",
  async ({ values }, { rejectWithValue }) => {
    try {
      const resData = await AddOrder(values);
      return resData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateOrderAsync = createAsyncThunk(
  "order/update",
  async ({ order_id, payload }, { rejectWithValue }) => {
    try {
      const resData = await UpdateOrder(order_id, payload);
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

export const updateOrderStatusAsync = createAsyncThunk(
  "order/update/status",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const resData = await UpdateOrderStatus(payload);
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

export const deleteOrderAsync = createAsyncThunk(
  "order/delete",
  async ({ order_id }) => {
    const response = await DeleteOrder(order_id);
    return response;
  }
);

const OrdersSlice = createSlice({
  name: "orders",
  initialState: {
    getAllOrdersResponse: {},
    getAllPublicOrdersResponse: {},
    getOrderByIdResponse: {},
    addOrderResponse: {},
    updateOrderResponse: {},
    deleteOrderResponse: {},
    updateOrderStatusResponse: {},
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllOrdersAsync.fulfilled, (state, action) => {
      state.getAllOrdersResponse = action.payload;
    });

    builder.addCase(getAllOrdersAsync.rejected, (state, action) => {
      state.getAllOrdersResponse = action.payload;
    });

    builder.addCase(getAllPublicOrderAsync.fulfilled, (state, action) => {
      state.getAllPublicOrdersResponse = action.payload;
    });

    builder.addCase(getAllPublicOrderAsync.rejected, (state, action) => {
      state.getAllPublicOrdersResponse = action.payload;
    });

    builder.addCase(addOrderAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.addOrderResponse = action.payload;

        // Ensure getAllSavingResponse and data array exist
        if (!state.getAllOrdersResponse) {
          state.getAllOrdersResponse = { data: [] };
        } else if (!Array.isArray(state.getAllOrdersResponse.data)) {
          state.getAllOrdersResponse.data = [];
        }

        state.getAllOrdersResponse.data.unshift({
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

    builder.addCase(addOrderAsync.rejected, (state, action) => {
      toast.error(action.payload.message);
      state.addOrderResponse = action.payload;
    });

    builder.addCase(updateOrderAsync.fulfilled, (state, action) => {
      state.updateOrderResponse = action.payload;
      toast.success(action.payload.message);
    });
    builder.addCase(updateOrderAsync.rejected, (state, action) => {
      state.updateOrderResponse = action.payload;
      toast.error("Update failed");
    });

    builder.addCase(getOrderByIdAsync.fulfilled, (state, action) => {
      state.getOrderByIdResponse = action.payload;
    });

    builder.addCase(getOrderByIdAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
      state.getOrderByIdResponse = action.payload;
    });

    builder.addCase(deleteOrderAsync.fulfilled, (state, action) => {
      state.deleteOrderResponse = action.payload;
      toast.success(action?.payload?.message);
    });

    builder.addCase(deleteOrderAsync.rejected, (state, action) => {
      state.deleteOrderResponse = action.payload;
      toast.error(action?.payload?.message);
    });

    builder.addCase(updateOrderStatusAsync.fulfilled, (state, action) => {
      state.updateOrderStatusResponse = action.payload;
      toast.success(action.payload.message);
    });
    builder.addCase(updateOrderStatusAsync.rejected, (state, action) => {
      state.updateOrderStatusResponse = action.payload;
      toast.error("Update failed");
    });
  },
});

export default OrdersSlice.reducer;
