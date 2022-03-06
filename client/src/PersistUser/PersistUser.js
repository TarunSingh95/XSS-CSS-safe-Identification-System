import React, { useState, useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import {AuthContext} from '../Context/AuthContext';
import useRefreshToken from '../Hooks/useRefreshToken';

const PersistUser = () => {
    
    const [isLoading, setIsLoading] = useState(true);
    const { accessToken } = useContext(AuthContext);
    const refresh = useRefreshToken();

    useEffect(() => {
        console.log("Persist Route", accessToken)

        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                // await send request to refresh route
                // console.log("Request sent to server");
                await refresh();
            } catch (error) {
                console.error(error.message);
            }
            finally { 
                isMounted && setIsLoading(false);
            }
        }

        !accessToken ? verifyRefreshToken() : setIsLoading(false);
    
      return () => {
          isMounted = false;
      }
    }, [])
    
    
    return isLoading ? <p>Loading</p> : <Outlet/>

}

export default PersistUser;