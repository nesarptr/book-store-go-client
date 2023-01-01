import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type auth = {
  userEmail?: string;
  userId: string;
  token: string;
  isAuth: boolean;
};

const initialState: auth = {
  token: "",
  isAuth: false,
  userId: "",
  userEmail: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<auth>) => {
      (state.token = payload.token), (state.isAuth = payload.isAuth);
      state.userId = payload.userId;
      state.userEmail = payload.userEmail || "";
    },
    logout: (state) => {
      (state.isAuth = false), (state.token = "");
      state.userId = "";
      state.userEmail = "";
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
