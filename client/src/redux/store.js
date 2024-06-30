
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";

// Configure the Redux store
const store = configureStore({
  reducer: {
    auth: authSlice.reducer, // Include the authSlice reducer under the 'auth' key in the Redux store
  },
});

export default store; // Export the configured Redux store


// ### Explanation:

// 1. **Importing Dependencies**:
//    - `import { configureStore } from "@reduxjs/toolkit";`: Imports the `configureStore` function from Redux Toolkit, which simplifies the Redux setup process.

// 2. **Importing Reducer Slice**:
//    - `import authSlice from "./features/auth/authSlice";`: Imports the `authSlice` reducer slice from `./features/auth/authSlice.js`. A reducer slice in Redux Toolkit typically includes reducers and actions.

// 3. **Configuring the Redux Store**:
//    - `const store = configureStore({ ... });`: Calls `configureStore` with an object that contains configuration options for the Redux store.
//    - **`reducer` Property**:
//      - Inside the configuration object, `reducer` is an object where each key represents a slice of the Redux state, and each value is a reducer function (or a slice reducer).
//      - In this case, `auth: authSlice.reducer` assigns the `authSlice.reducer` as the reducer function for the `auth` slice of the Redux store. This means that the state managed by `authSlice.reducer` will be accessible under `state.auth` in your Redux store.

// 4. **Exporting the Redux Store**:
//    - `export default store;`: Exports the configured Redux store as the default export from this module. This allows other parts of your application to import and use the Redux store.

// ### Usage:
// - This setup assumes that `authSlice.js` (or `authSlice.ts` if TypeScript is used) defines a slice of the Redux state that includes both reducer logic and action creators using Redux Toolkit's `createSlice` function.
// - Reducer slices typically encapsulate logic related to a specific part of your application state (in this case, authentication).
// - This store configuration enables your React components to interact with the Redux state through actions dispatched to the store, allowing for predictable state management and updates across your application.

// By following this pattern, you leverage Redux Toolkit's simplified API for managing Redux state and benefit from features like immutable state updates, simplified action creators, and more concise code compared to traditional Redux setup.