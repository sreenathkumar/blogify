import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { api } from "@api/api";
import { actions } from "@actions/actions";

// ================================================================
// custom hook which intercept the request and response
// and checks if the token is expired
// if it is, it refreshes the token and retries the request
// ================================================================

export const useAxios = () => {
  const { auth, dispatchAuth } = useAuth();

  useEffect(() => {
    //request interceptor

    const reqInterceptor = api.interceptors.request.use(
      (config) => {
        //get the token from the context
        const accessToken = auth?.accessToken;
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    //response interceptor
    const resInterceptor = api.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const response = await api.post("/auth/refresh-token", {
              refreshToken: auth.refreshToken,
            });
            //get the new token from the response
            const { accessToken, refreshToken } = response.data;

            //set the new token in the Authorization header
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;

            if (response.status === 200) {
              dispatchAuth({
                type: actions.auth.AUTH_TOKEN_UPDATE,
                payload: { accessToken, refreshToken },
              });
              return axios(originalRequest);
            }
          } catch (error) {
            throw new error();
          }
        }
        if (error.response.status === 403) {
          dispatchAuth({ type: actions.auth.LOGOUT });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      //cleanup
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
  }, [auth.accessToken]);

  return api;
};
