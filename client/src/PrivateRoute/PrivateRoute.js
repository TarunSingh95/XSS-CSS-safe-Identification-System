import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = ({ access }) => {
    
    // const { accessToken, isLoggedIn } = useContext(AuthContext);
    const { accessToken, isLoggedIn } = access;
    console.log(accessToken)
    console.log(isLoggedIn)

    return isLoggedIn===true && accessToken!==undefined && accessToken!=="" ? <Outlet/> : <Navigate to="/login" />
}

export default PrivateRoute