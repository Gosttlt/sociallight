import { createAsyncThunk } from "@reduxjs/toolkit";
import { authDTOType, logoutDTOType } from "./types";
import api from "@/6Shared/api";
import { ApiErrorType } from "@/6Shared/api/types";

export const fetchRegisterUser = createAsyncThunk(
  "authSlice/fetchRegisterUser",
  async (data: authDTOType, thunkAPI) => {
    try {
      const response = await api.post<{ email: string; statusCode: number }>(
        "registration",
        data
      );
      return response.data;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue(
        (e as ApiErrorType).response?.data.message
      );
    }
  }
);

export const fetchLoginUser = createAsyncThunk(
  "authSlice/fetchLoginUser",
  async (data: authDTOType, thunkAPI) => {
    try {
      const response = await api.post<{ email: string; statusCode: number }>(
        "login",
        data
      );
      return response.data;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue(
        (e as ApiErrorType).response?.data.message
      );
    }
  }
);

export const fetchLogoutUser = createAsyncThunk(
  "authSlice/fetchLogoutUser",
  async (data: logoutDTOType, thunkAPI) => {
    try {
      const response = await api.post("logout", data);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(
        (e as ApiErrorType).response?.data.message
      );
    }
  }
);

export const fetchRefreshUser = createAsyncThunk(
  "authSlice/fetchRefreshUser",
  async (data: logoutDTOType, thunkAPI) => {
    try {
      const response = await api.post("refresh", data);
      return response.data;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue(
        (e as ApiErrorType).response?.data.message
      );
    }
  }
);
