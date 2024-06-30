// The `authActions.js` file contains Redux actions created using `createAsyncThunk` from Redux Toolkit. Here's an explanation of each action creator:

// ### `userLogin`

import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("api/v1/auth/login", { role, email, password });
      if (data.success) {
        localStorage.setItem("token", data.token);
        alert(data.message); // Optional: Display an alert for successful login
        window.location.replace("/"); // Redirect to the homepage
      }
      return data; // Return response data to the reducer
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message); // Return specific error message from API response
      } else {
        return rejectWithValue(error.message); // Return general error message
      }
    }
  }
);

// - **Explanation**:
//   - `userLogin` is an async thunk action creator that dispatches actions related to user login.
//   - It sends a POST request to `/auth/login` endpoint with `role`, `email`, and `password` as parameters.
//   - If login is successful (`data.success` is true), it stores the token in local storage (`localStorage.setItem("token", data.token)`) and optionally alerts the user with `data.message`.
//   - Upon successful login, it redirects the user to the homepage (`window.location.replace("/")`).
//   - If there's an error during login (e.g., network error or incorrect credentials), it handles the error:
//     - Checks if `error.response.data.message` exists (indicating an error message from the API).
//     - If available, it dispatches the error message to the reducer using `rejectWithValue`.
//     - If not available, it dispatches a generic error message (`error.message`).

// ### `userRegister`

export const userRegister = createAsyncThunk(
  "auth/register",
  async (
    {
      name,
      role,
      email,
      password,
      phone,
      organisationName,
      address,
      hospitalName,
      website,
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.post("api/v1/auth/register", {
        name,
        role,
        email,
        password,
        phone,
        organisationName,
        address,
        hospitalName,
        website,
      });
      if (data?.success) {
        alert("User Registered Successfully"); // Optional: Display an alert for successful registration
        window.location.replace("/login"); // Redirect to the login page after successful registration
      }
      return data; // Return response data to the reducer
    } catch (error) {
      console.log(error); // Log the error for debugging purposes
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message); // Return specific error message from API response
      } else {
        return rejectWithValue(error.message); // Return general error message
      }
    }
  }
);

// - **Explanation**:
//   - `userRegister` is an async thunk action creator that dispatches actions related to user registration.
//   - It sends a POST request to `/auth/register` endpoint with various user details (`name`, `role`, `email`, etc.).
//   - If registration is successful (`data?.success` is true), it optionally alerts the user with a success message (`"User Registered Successfully"`) and redirects to the login page (`window.location.replace("/login")`).
//   - If there's an error during registration (e.g., validation error or server error), it handles the error:
//     - Logs the error to the console for debugging purposes (`console.log(error)`).
//     - Checks if `error.response.data.message` exists (indicating an error message from the API).
//     - If available, it dispatches the error message to the reducer using `rejectWithValue`.
//     - If not available, it dispatches a generic error message (`error.message`).

// ### `getCurrentUser`

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("api/v1/auth/current-user");
      if (res.data) {
        return res?.data; // Return user data to the reducer
      }
    } catch (error) {
      console.log(error); // Log the error for debugging purposes
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message); // Return specific error message from API response
      } else {
        return rejectWithValue(error.message); // Return general error message
      }
    }
  }
);
// ```

// - **Explanation**:
//   - `getCurrentUser` is an async thunk action creator that fetches the current user's data.
//   - It sends a GET request to `/auth/current-user` endpoint.
//   - If the request is successful (`res.data` exists), it returns the user data to the reducer.
//   - If there's an error during the request (e.g., network error or authentication issue), it handles the error:
//     - Logs the error to the console for debugging purposes (`console.log(error)`).
//     - Checks if `error.response.data.message` exists (indicating an error message from the API).
//     - If available, it dispatches the error message to the reducer using `rejectWithValue`.
//     - If not available, it dispatches a generic error message (`error.message`).

// ### Summary:
// - These async thunk action creators (`userLogin`, `userRegister`, `getCurrentUser`) utilize `createAsyncThunk` from Redux Toolkit to manage asynchronous logic (like API requests) and dispatch actions based on the API responses.
// - They handle success scenarios by storing tokens, redirecting users, and returning data to the reducer, and handle error scenarios by dispatching error messages to the reducer for state updates.
// - The use of `rejectWithValue` allows for returning specific error messages from API responses or general error messages for error handling in Redux reducers.
