import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type auth = {
  userEmail?: string;
  userId: string;
  jwtoken: string;
  varifyToken?: string;
  isAuth: boolean;
};

const initialState: auth = {
  jwtoken: "",
  isAuth: false,
  userId: "",
  userEmail: "",
  varifyToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<auth>) => {
      (state.jwtoken = payload.jwtoken), (state.isAuth = payload.isAuth);
      state.userId = payload.userId;
      state.userEmail = payload.userEmail || "";
    },
    logout: (state) => {
      (state.isAuth = false), (state.jwtoken = "");
      state.userId = "";
      state.userEmail = "";
    },
    token: (
      state,
      { payload }: PayloadAction<{ token: string; id: string }>
    ) => {
      state.varifyToken = payload.token;
      state.userId = payload.id;
    },
  },
});

export const { login, logout, token } = authSlice.actions;

export default authSlice.reducer;
