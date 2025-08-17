import React from 'react';
import { Navigate, useLocation } from 'react-router';
import Loader from '../pages/Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Get DB user info when user logs in
    const { data: users = {}, isLoading } = useQuery({
        queryKey: ["users", user?.email],
        enabled: !!user?.email, // Only run when we have user
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`);
            return res.data;
        },
    });

    const location = useLocation()
    // //console.log(location)

    if (loading || isLoading) {
        return <Loader />
    }
    if (users?.role === 'admin') {
        return children
    }
    return <Navigate state={location.pathname} to='/auth/login'></Navigate>
};

export default AdminRoute;