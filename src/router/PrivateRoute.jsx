import React from 'react';
import { Navigate, useLocation } from 'react-router';
import Loader from '../pages/Loader/Loader';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation()
    // //console.log(location)

    if (loading) {
        return <Loader />
    }
    if (user?.email) {
        return children
    }
    return <Navigate state={location.pathname} to='/auth/login'></Navigate>
};

export default PrivateRoute;