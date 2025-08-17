import axios from 'axios';
import useAuth from './useAuth';
import { useEffect } from 'react';

const axiosSecure = axios.create({
    baseURL: `https://b11a12-server-side-naeem240.vercel.app`
});

const useAxiosSecure = () => {
    const { user, loading } = useAuth();

    //console.log(user?.accessToken)

    useEffect(() => {
        if (loading) return;
        const interceptor = axiosSecure.interceptors.request.use(
            (config) => {
                if (user?.accessToken) {
                    config.headers.Authorization = `Bearer ${user.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        return () => {
            axiosSecure.interceptors.request.eject(interceptor);
        };
    }, [user]);

    return axiosSecure;
};


export default useAxiosSecure;
