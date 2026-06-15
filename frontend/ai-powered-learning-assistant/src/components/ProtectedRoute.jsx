import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const isAuthenticated = true; // replace with real auth later

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;