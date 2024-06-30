import axios from "axios";

// Create an instance of Axios with baseURL from environment variables
const API = axios.create({ baseURL: process.env.REACT_APP_BASEURL });

// Interceptor to add Authorization header to each outgoing request
API.interceptors.request.use((req) => {
  // Check if token exists in localStorage
  if (localStorage.getItem("token")) {
    // Set Authorization header with Bearer token
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")} `;
  }
  return req;
});

export default API;
/*Explanation:
Axios Instance Creation:

axios.create({ baseURL: process.env.REACT_APP_BASEURL }): This creates an instance of Axios with a base URL set to the value of REACT_APP_BASEURL from your environment variables. This base URL will be prefixed to relative URLs in your API calls.
Request Interceptor:

API.interceptors.request.use((req) => { ... }): Axios interceptors allow you to run code or transform requests before they are sent. Here, you're using a request interceptor to modify outgoing requests.
localStorage.getItem("token"): Checks if there's a token stored in the browser's localStorage.
req.headers.Authorization = Bearer ${localStorage.getItem("token")} ;: If a token exists, it sets the Authorization header for the request with a Bearer token scheme, which is commonly used for JWT (JSON Web Token) authentication.
Exporting the API Instance:

export default API;: Exports the configured Axios instance API, which can now be imported into other parts of your application to make API requests.
Notes:
Ensure that process.env.REACT_APP_BASEURL is correctly defined in your environment variables (usually set in .env files) and points to the base URL of your backend API.
The interceptor setup allows you to centralize authorization logic for all API requests that use this Axios instance.
This pattern is useful for maintaining consistent headers, handling authentication tokens, and managing API requests in a structured manner across your React application. */