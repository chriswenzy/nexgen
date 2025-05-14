import {
  AddUser,
  DeleteUser,
  GetAllUsers,
  getAuthUser,
  GetUserById,
  updateAuthUser,
  UpdateUser,
} from "@/services/user/usersService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getAllUsersAsync = createAsyncThunk(
  "users/all",
  async ({ page, query }) => {
    const response = await GetAllUsers(page, query);
    return response;
  }
);

export const getUserByIdAsync = createAsyncThunk(
  "users/by/id",
  async ({ id }) => {
    const response = await GetUserById(id);
    return response;
  }
);

export const addUserAsync = createAsyncThunk(
  "users/add",
  async ({ values }, { rejectWithValue }) => {
    try {
      const resData = await AddUser(values);
      return resData;
    } catch (error) {
      console.log("Error Response:", error);

      // Extract error response
      const errors = error?.response?.data; // Ensure we are accessing the correct structure

      if (errors && typeof errors === "object") {
        Object.entries(errors).forEach(([field, messages]) => {
          messages.forEach((msg) => {
            toast.error(`${field}: ${msg}`); // Display error using toast
          });
        });

        return rejectWithValue(errors); // Pass errors to reducer
      }

      // Default error handling
      toast.error("An unknown error occurred.");
      return rejectWithValue(["An unknown error occurred."]);
    }
  }
);

export const updateUserAsync = createAsyncThunk(
  "users/update",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const resData = await UpdateUser(id, payload);
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

export const deleteUserAsync = createAsyncThunk(
  "users/deleteUser",
  async ({ id }) => {
    const response = await DeleteUser(id);
    return response;
  }
);

export const getAuthUserAsync = createAsyncThunk("users/auth", async () => {
  const response = await getAuthUser();
  return response;
});

export const updateAuthUsersAsync = createAsyncThunk(
  "users/auth/update",
  async (payload) => {
    const response = await updateAuthUser(payload);
    return response;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    getAllUsersResponse: {},
    getUserByIdResponse: {},
    updateUserResponse: {},
    updateUserResponseFail: [],
    addUserResponse: {},
    getAuthUserResponse: {},
    updateAuthUserResponse: {},
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsersAsync.fulfilled, (state, action) => {
      state.getAllUsersResponse = action.payload;
    });

    builder.addCase(addUserAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.addUserResponse = action.payload;
        state.getAllUsersResponse.data.unshift({
          id: action.payload?.data?.id,
          first_name: action.payload?.data?.first_name,
          email: action.payload?.data?.email,
          is_active: action.payload?.data?.is_active,
          phone_number: action.payload?.data?.phone_number,
          last_name: action?.payload?.data?.last_name,
        });

        toast.success(action.payload.message);
      }
    });
    builder.addCase(addUserAsync.rejected, (state, action) => {
      toast.error(action.payload.message);
    });

    builder.addCase(updateUserAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.updateUserResponse = action.payload;
        state.getAllUsersResponse.data = state.getAllUsersResponse.data.map(
          (user) =>
            user.id === action.payload?.id
              ? {
                  id: action.payload?.data?.id,
                  first_name: action.payload?.data?.first_name,
                  email: action.payload?.data?.email,
                  is_active: action.payload?.data?.is_active,
                  phone_number: action.payload?.data?.phone_number,
                  last_name: action?.payload?.data?.last_name,
                }
              : user
        );

        toast.success(action.payload.message);
      }
    });

    builder.addCase(updateUserAsync.rejected, (state, action) => {
      toast.error("Update failed");
    });

    builder.addCase(getAuthUserAsync.fulfilled, (state, action) => {
      state.getAuthUserResponse = action.payload;
    });

    builder.addCase(getAuthUserAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
    });

    builder.addCase(updateAuthUsersAsync.fulfilled, (state, action) => {
      state.updateAuthUserResponse = action.payload;
      toast.success(action?.payload?.message);
    });

    builder.addCase(updateAuthUsersAsync.rejected, (state, action) => {
      toast.error(action?.payload?.message);
    });
  },
});

export default userSlice.reducer;
