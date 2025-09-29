import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const getIsAuthenticated = () => {
    // ¡CORRECCIÓN CLAVE! Usamos 'isAuthenticated' para coincidir con el LoginForm
    return localStorage.getItem('isAuthenticated') === 'true';
};

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = getIsAuthenticated();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;