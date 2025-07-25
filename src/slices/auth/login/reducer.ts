import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: {},
  error: "", // for error message
  loading: false,
  isUserLogout: false,
  errorMsg: false, // for error
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    apiError(state, action) {
      state.error = action.payload.data;
      state.loading = false; // Cambiado de true a false
      state.isUserLogout = false;
      state.errorMsg = true;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.errorMsg = false;
      state.error = "";
    },
    logoutUserSuccess(state, action) {
      state.isUserLogout = true;
      state.user = {};
    },
    reset_login_flag(state) {
      state.error = "";
      state.loading = false;
      state.errorMsg = false;
    },
  },
});

export const { apiError, loginSuccess, logoutUserSuccess, reset_login_flag } =
  loginSlice.actions;

export default loginSlice.reducer;
