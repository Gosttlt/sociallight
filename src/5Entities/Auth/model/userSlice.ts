import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchLoginUser, fetchLogoutUser, fetchRegisterUser } from "./userThink";
import { ApiResponseType } from "6Shared/api/types";
import { authFieldsType } from "./types";

type UserStateType = {
  email: string | null;
  loading: boolean;
  error: any;
  userId: string | null;
  login: string;
  password: string;
  validation: boolean;
};

const initialState: UserStateType = {
  email: null,
  loading: false,
  error: null,
  userId: null,
  login: "",
  password: "",
  validation: false,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFieldAction: (state, { payload }: PayloadAction<authFieldsType>) => {
      const { prop, value } = payload;
      state[prop] = value;
    },
    removeEmailAction: (state) => {
      state.email = null;
    },
  },
  extraReducers: (builder) => {
    //register
    builder.addCase(fetchRegisterUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchRegisterUser.fulfilled,
      (state, action: PayloadAction<ApiResponseType<{ email: string; id: string }>>) => {
        state.loading = false;
        state.email = action.payload.data?.email ?? null;
        state.userId = action.payload.data?.id ?? null;
      },
    );
    builder.addCase(fetchRegisterUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //login
    builder.addCase(fetchLoginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchLoginUser.fulfilled,
      (state, action: PayloadAction<ApiResponseType<{ email: string; id: string }>>) => {
        state.loading = false;
        state.email = action.payload.data?.email ?? null;
        state.userId = action.payload.data?.id ?? null;
      },
    );
    builder.addCase(fetchLoginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //logout
    builder.addCase(fetchLogoutUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchLogoutUser.fulfilled, (state) => {
      state.loading = false;
      state.email = null;
      state.userId = null;
    });
    builder.addCase(fetchLogoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setFieldAction } = userSlice.actions;

export default userSlice.reducer;
