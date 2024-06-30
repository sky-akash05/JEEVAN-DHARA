import React from "react";
import ReactDOM from "react-dom/client"; // Import ReactDOM client for React 18 concurrent mode
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter for client-side routing
import { Provider } from "react-redux"; // Import Provider to connect Redux store to React components
import store from "./redux/store"; // Import Redux store

// Create a React root using ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the root of the application
root.render(
  <React.StrictMode> {/* Enable React strict mode for additional checks and warnings */}
    <Provider store={store}> {/* Provide Redux store to the entire application */}
      <BrowserRouter> {/* Enable client-side routing using BrowserRouter */}
        <App /> {/* Render the main App component */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); // Measure and report web vitals (performance metrics)
