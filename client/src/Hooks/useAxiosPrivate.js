import { axiosPrivate } from "../Api/Axios";
import { useContext, useEffect } from "react";
import {AuthContext} from "../Context/AuthContext";
import axios from "axios";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
    
    const refresh = useRefreshToken();
    const { accessToken } = useContext(AuthContext);

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use((config) => {
            
            // If Config does not have a Authorization header
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = `Bearer ${accessToken}`
            }
            return config;
        }, (error) => {
            Promise.reject(error.message);
        })


        const responseIntercept = axiosPrivate.interceptors.response.use((response) => { 

            return response

        }, async (error) => { 

            // Extract details about the failed request
            const prevRequest = error?.config;
            if (error?.response?.status === 403 && !prevRequest.sent) {
                prevRequest.sent = true;
                const newAccessToken = await refresh();
                prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                prevRequest.headers['test'] = "test"
                return axiosPrivate(prevRequest);
            
            }
            return Promise.reject(error.message);
         })
        
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [accessToken, refresh])

    return axiosPrivate

}

export default useAxiosPrivate;