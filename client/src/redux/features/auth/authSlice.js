import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, userLogin, userRegister } from "./authActions";

// Initial token fetched from localStorage or null if not present
const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;

// Initial state for the auth slice
const initialState = {
  loading: false,   // Indicates if an async operation is in progress
  user: null,       // Stores the current user's data
  token,            // Stores the authentication token
  error: null,      // Stores any error that occurs during async operations
};

// Create the auth slice using createSlice from Redux Toolkit
const authSlice = createSlice({
  name: "auth",     // Slice name
  initialState,     // Initial state defined above
  reducers: {},     // Empty object for reducers since we use extraReducers for async logic
  extraReducers: (builder) => {
    // Reducer for handling user login
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;   // Set loading to true when login request starts
      state.error = null;     // Clear any previous error
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false;        // Set loading to false when login request is fulfilled
      state.user = payload.user;    // Set user data from payload
      state.token = payload.token;  // Set authentication token from payload
    });
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false;   // Set loading to false when login request is rejected
      state.error = payload;   // Set error message from payload
    });

    // Reducer for handling user registration
    builder.addCase(userRegister.pending, (state) => {
      state.loading = true;    // Set loading to true when registration request starts
      state.error = null;      // Clear any previous error
    });
    builder.addCase(userRegister.fulfilled, (state, { payload }) => {
      state.loading = false;   // Set loading to false when registration request is fulfilled
      state.user = payload.user;  // Set user data from payload
    });
    builder.addCase(userRegister.rejected, (state, { payload }) => {
      state.loading = false;   // Set loading to false when registration request is rejected
      state.error = payload;   // Set error message from payload
    });

    // Reducer for fetching current user details
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;    // Set loading to true when fetching current user starts
      state.error = null;      // Clear any previous error
    });
    builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
      state.loading = false;   // Set loading to false when fetching current user is fulfilled
      state.user = payload.user;  // Set current user data from payload
    });
    builder.addCase(getCurrentUser.rejected, (state, { payload }) => {
      state.loading = false;   // Set loading to false when fetching current user is rejected
      state.error = payload;   // Set error message from payload
    });
  },
});

export default authSlice;
