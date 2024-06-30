import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import API from "../../services/API";
import { getCurrentUser } from "../../redux/features/auth/authActions";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();

  // Function to fetch current user information
  const getUser = async () => {
    try {
      const { data } = await API.get("api/v1/auth/current-user");
      if (data?.success) {
        dispatch(getCurrentUser(data)); // Dispatch action to update current user state in Redux
      }
    } catch (error) {
      localStorage.clear(); // Clear localStorage if error occurs (for example, if token is invalid or expired)
      console.log(error); // Log the error for debugging purposes
    }
  };

  useEffect(() => {
    getUser(); // Fetch current user information when the component mounts
  }, [dispatch]); // Dependency array ensures useEffect runs only once

  // Render children if token exists in localStorage (user authenticated), otherwise redirect to login
  if (localStorage.getItem("token")) {
    return children; // Render the children components (protected content)
  } else {
    return <Navigate to="/login" />; // Redirect to login page using React Router Navigate component
  }
};

export default ProtectedRoute;
//The ProtectedRoute component you've implemented is designed to protect routes in your application by checking if a user is authenticated