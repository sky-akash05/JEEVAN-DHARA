import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  if (localStorage.getItem("token")) {
    return <Navigate to="/" />; // Redirect to home page if user is authenticated (token exists in localStorage)
  } else {
    return children; // Render children (public content) if user is not authenticated (no token in localStorage)
  }
};

export default PublicRoute;
//The PublicRoute component you've created serves the purpose of redirecting authenticated users away from public routes. Here’s a breakdown of how it works: