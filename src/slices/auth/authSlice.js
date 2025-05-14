import {
  forgetPassword,
  kyc,
  login,
  logout,
  register,
  resetPassword,
  verifyOtp,
} from "@/services/auth/authService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const loginAsync = createAsyncThunk(
  "users/login",
  async ({ values }, thunkAPI) => {
    try {
      const response = await login(values);
      return response;
    } catch (error) {
      const { response } = error;

      if (response && response.data) {
        const errors = response.data;

        // Toast specific errors like 'non_field_errors'
        if (errors && errors.non_field_errors) {
          errors.non_field_errors.forEach((errorMsg) => {
            toast.error(errorMsg);
          });
        }

        // Return specific error messages for thunkAPI
        return thunkAPI.rejectWithValue(errors);
      }

      // Handle general or network errors
      toast.error("An unexpected error occurred. Please try again.");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const kycAsync = createAsyncThunk(
  "users/kyc",
  async ({ values }, thunkAPI) => {
    try {
      const response = await kyc(values);

      return response;
    } catch (error) {
      const { response } = error;

      if (response && response.data) {
        const errors = response.data;

        // Toast specific errors like 'non_field_errors'
        if (errors && errors.non_field_errors) {
          errors.non_field_errors.forEach((errorMsg) => {
            toast.error(errorMsg);
          });
        }

        // Return specific error messages for thunkAPI
        return thunkAPI.rejectWithValue(errors);
      }

      // Handle general or network errors
      toast.error("An unexpected error occurred. Please try again.");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const registerAsync = createAsyncThunk(
  "users/register",
  async ({ values }, thunkAPI) => {
    try {
      const response = await register(values);
      return response;
    } catch (error) {
      const { response } = error;

      if (response && response.data) {
        const errors = response.data;

        console.log("respomse", errors);
        // Toast each field-specific error
        if (errors) {
          Object.entries(errors).forEach(([field, fieldErrors]) => {
            fieldErrors.forEach((err) => {
              toast.error(`${field}: ${err}`);
            });
          });
        }

        // Return specific error messages for thunkAPI
        return thunkAPI.rejectWithValue(errors);
      }

      // Handle general or network errors
      toast.error("An unexpected error occurred. Please try again.");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const forgetPasswordAsync = createAsyncThunk(
  "users/forget/password",
  async ({ values }, thunkAPI) => {
    try {
      const response = await forgetPassword(values);
      console.log("res forget", response);
      // Show success toast
      toast.success(response.message);
      return response;
    } catch (error) {
      const { response } = error;

      if (response && response.data) {
        const { message, errors } = response.data;

        // Toast the main error message
        if (message) {
          toast.error(message);
        }

        // Toast the specific error under 'errors.error'
        if (errors && errors.error) {
          toast.error(errors.error);
        }

        // Return specific error messages for thunkAPI
        return thunkAPI.rejectWithValue(errors);
      }

      // Handle general or network errors
      toast.error("An unexpected error occurred. Please try again.");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const resetPasswordAsync = createAsyncThunk(
  "users/reset/password",
  async ({ values }, thunkAPI) => {
    try {
      const response = await resetPassword(values);
      return response;
    } catch (error) {
      // Handle errors here
      toast.error(error?.response?.data?.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const verifyOtpAsync = createAsyncThunk(
  "users/activate/account",
  async ({ values }, thunkAPI) => {
    try {
      const response = await verifyOtp(values);
      return response;
    } catch (error) {
      const { response } = error;

      if (response && response.data) {
        const { message, errors } = response.data;

        // Toast the main error message
        if (message) {
          toast.error(message);
        }

        // Toast each field-specific error
        if (errors) {
          Object.entries(errors).forEach(([field, fieldErrors]) => {
            // Handle both string and array error messages
            if (Array.isArray(fieldErrors)) {
              fieldErrors.forEach((err) => {
                toast.error(`${field}: ${err}`);
              });
            } else {
              toast.error(`${field}: ${fieldErrors}`);
            }
          });
        }

        // Return specific error messages for thunkAPI
        return thunkAPI.rejectWithValue(errors);
      }

      // Handle general or network errors
      toast.error("An unexpected error occurred. Please try again.");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutAsync = createAsyncThunk("users/logout", async () => {
  const response = await logout();

  return response;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loginResponse: {},
    forgotPasswordResponse: {},
    resetPasswordResponse: {},
    registerResponse: {},
    verifyOtpResponse: {},
    kycResponse: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.loginResponse = action.payload;
      toast.success("Login successful");
      if (action.type === loginAsync.fulfilled.type) {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("token", action.payload.token);
          sessionStorage.setItem("expiry", action.payload.expiry);
          sessionStorage.setItem(
            "auth-user",
            JSON.stringify(action.payload.user)
          );
        }
      }
    });

    builder.addCase(loginAsync.pending, (state, action) => {
      state.loginResponse = action.payload;
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      toast.error("Login failed!");
      state.loginResponse = action.payload;
    });

    builder.addCase(kycAsync.fulfilled, (state, action) => {
      toast.success(action?.payload?.message);

      state.kycResponse = action.payload;
    });
    builder.addCase(kycAsync.rejected, (state, action) => {
      state.kycResponse = action.payload;
      toast.error(action?.payload?.message);
    });

    builder.addCase(forgetPasswordAsync.fulfilled, (state, action) => {
      state.forgotPasswordResponse = action.payload;
    });
    builder.addCase(forgetPasswordAsync.rejected, (state, action) => {
      state.forgotPasswordResponse = action.payload;
      toast.error(action?.payload?.message);
    });
    builder.addCase(resetPasswordAsync.fulfilled, (state, action) => {
      state.resetPasswordResponse = action.payload;
      toast.success("Password Reset was Successful");
    });
    builder.addCase(resetPasswordAsync.rejected, (state, action) => {
      state.resetPasswordResponse = action.payload;
      toast.error("Error: Please try again");
    });

    builder.addCase(registerAsync.fulfilled, (state, action) => {
      state.registerResponse = action.payload;
      toast.success(action?.payload?.message);
    });
    builder.addCase(registerAsync.rejected, (state, action) => {
      state.registerResponse = action.payload;
      toast.error(action?.payload?.message);
    });

    builder.addCase(verifyOtpAsync.fulfilled, (state, action) => {
      state.verifyOtpResponse = action.payload;
      toast.success(action?.payload?.data?.message);
    });
    builder.addCase(verifyOtpAsync.rejected, (state, action) => {
      state.verifyOtpResponse = action.payload;
      toast.error(action?.payload?.message);
    });

    builder.addCase(logoutAsync.fulfilled, (state, action) => {
      state.resetPasswordResponse = action.payload;
      toast.success(action.payload.message);
    });
  },
});

export default authSlice.reducer;
