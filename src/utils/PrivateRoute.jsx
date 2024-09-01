import React from 'react';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const PrivateRoute = ({ children }) => {
    const authToken = localStorage.getItem('authToken');

    return authToken ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
