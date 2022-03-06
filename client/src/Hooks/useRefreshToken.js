import { useContext, useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import axios from '../Api/Axios';
import {AuthContext} from '../Context/AuthContext';

const useRefrehToken = () => {
    
    const { accessToken, setAccessToken, setIsLoggedIn } = useContext(AuthContext);
    // const [ tempToken, setTempToken ] = useState("");

    // useEffect(() => { 
    //     return accessToken
    // }, [setAccessToken])
    
    console.log("useRefresh")

    const refresh = async () => {
        
        try {
            
            const response = await axios.get('/api/auth/refresh', {
                withCredentials : true
            })

            console.log(response.data);
    
            // if (response?.status === 200 && response?.statusText === 'OK' && response?.data?.message === 'Success.') {
                
            let tempAccessToken = response.data.access;
            setAccessToken(prev => { 
                // console.log(prev);
                return tempAccessToken 
             });               
            setIsLoggedIn(true)

            return response.data.access; 
            }
        catch (error) {
            console.error(error.message);
            }
    }

    return refresh;
}

export default useRefrehToken;