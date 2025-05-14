import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Departments,
  Permission,
  Roles,
} from "../../services/data/dataService";

export const getAllRoles = createAsyncThunk("roles/all", async () => {
  const response = await Roles();
  return response;
});
export const getAllPermission = createAsyncThunk("permission/all", async () => {
  const response = await Permission();
  return response;
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    roles: {},
    permission: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllRoles.fulfilled, (state, action) => {
      state.roles = action.payload;
    });
    builder.addCase(getAllPermission.fulfilled, (state, action) => {
      state.permission = action.payload;
    });
  },
});

export default dataSlice.reducer;
