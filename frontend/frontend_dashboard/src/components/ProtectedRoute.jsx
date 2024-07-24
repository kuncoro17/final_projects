// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    
    // Redirect to login if no token found
    return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
