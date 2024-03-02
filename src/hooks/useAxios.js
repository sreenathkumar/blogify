import axios from "axios"
import { useEffect } from "react"
import { useAuth } from "./useAuth";
import { api } from "@api/api";

export const useAxios = () => {
    const {auth, setAuth} = useAuth();

    useEffect(() => {
      //request interceptor
   const reqInterceptor = axios.interceptors.request.use(
        (config)=>{
            //get the token from the context
            const accessToken = auth?.accessToken;

            if(accessToken){
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error)=>{
            return Promise.reject(error);
        }
    );

    //response interceptor
   const resInterceptor= axios.interceptors.response.use(
        (response)=>{
            return response;
        },
        async (error)=>{
            const originalRequest = error.config;
            if(error.response.status === 401 && !originalRequest._retry){
                originalRequest._retry = true;
                try {
                    const response = await api.post("/auth/refresh-token", {
                        refreshToken: auth.refreshToken
                    });
                    //get the new token from the response
                    const {accessToken, refreshToken} = response.data;

                    //set the new token in the Authorization header
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                    if(response.status === 200){
                        setAuth({...auth, accessToken, refreshToken});
                        return axios(originalRequest);
                    }
                } catch (error) {
                    throw new error;
                }
            }
            return Promise.reject(error);
        }
    );
    
      return () => {
        //cleanup
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      }
    }, [auth.accessToken])
    
    return api;

}