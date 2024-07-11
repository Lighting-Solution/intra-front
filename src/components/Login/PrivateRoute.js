// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const storedToken = localStorage.getItem("authToken");
  const isAuthenticated = storedToken !== null;

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
