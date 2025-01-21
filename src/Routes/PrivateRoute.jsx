import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';


const PrivateRoute = ({children}) => {
    const {user,loading}=useAuth()
    const location = useLocation()
    if(loading){
        // return <>
        // <Skeleton /> // Simple, single-line loading skeleton
        // <Skeleton count={5} /> // Five-line loading skeleton
        // </>
        return <span className="loading loading-infinity loading-lg"></span>
    }
    if(user){
        return children
    }
    return (
        <div>
           <Navigate to='/login' state={{ from: location }} replace='true' />
           {/* <Navigate to='login'></Navigate> */}
        </div>
    );
};

export default PrivateRoute;