import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  registrationError: null,
  message: null,
  loading: false,
  user: null,
  success: false,
  error: false,
  isUserLogout: true,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    registerUserSuccessful(state, action) {
      state.user = action.payload.user;
      state.loading = false;
      state.success = true;
      state.registrationError = null;
      state.error = false;
      console.log("REDUCER: New state", {
        success: state.success,
        loading: state.loading,
      });
    },
    registerUserFailed(state, action) {
      state.user = null;
      state.loading = false;
      state.registrationError =
        action.payload.message || action.payload || "Registration failed";
      state.error = true;
      state.success = false;
    },
    registerUserPending(state) {
      state.loading = true;
      state.error = false;
      state.success = false;
      state.registrationError = null;
    },
    resetRegisterFlagChange(state) {
      state.success = false;
      state.error = false;
      state.registrationError = null;
      state.loading = false;
    },
    apiErrorChange(state, action) {
      state.error = false;
      state.loading = false;
      state.isUserLogout = false;
      state.registrationError = null;
      state.success = false;
    },
  },
});

export const {
  registerUserSuccessful,
  registerUserFailed,
  registerUserPending,
  resetRegisterFlagChange,
  apiErrorChange,
} = registerSlice.actions;

export default registerSlice.reducer;
