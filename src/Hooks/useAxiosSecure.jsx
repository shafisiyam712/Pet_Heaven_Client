import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
//https://pet-adoptation-server-phi.vercel.app

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    //baseURL: 'https://pet-adoptation-server-phi.vercel.app',
    withCredentials: true
});

const useAxiosSecure = () => {
    const { singOutUser } = useAuth;
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.interceptors.response.use(response => {
            return response;
        }, error => {
            console.log('api response error status', error.status);
            if (error.status === 401 || error.status === 403) {
                singOutUser()
                    .then(() => {
                        // redirect to the login page
                        navigate('/login')
                    })
                    .catch(err => console.log(err))
            }
            return Promise.reject(error);
        })
    }, [])

    return axiosInstance;
};

export default useAxiosSecure;



