import { actions } from "@actions/actions";
import { api } from "@api/api";
import axios from "axios";
import { useEffect, useState } from "react";

const useLoginCheck = (auth, dispatchAuth) => {
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!auth || !auth.accessToken) {
      const localToken = localStorage.getItem("token"); //get the token from local storage
      const localUserId = localStorage.getItem("userId"); //get the user from local storage

      //do further checking if the token is available
      if (localToken && localUserId) {
        const { refreshToken, createdAt } = JSON.parse(localToken); //parse the token

        const now = new Date().getTime();
        const diff = now - createdAt;

        //if the token is less than 24 hours old, then refresh the token
        if (diff < 24 * 60 * 60 * 1000) {
          axios
            .all([
              api.post(`/auth/refresh-token`, { refreshToken }),
              api.get(`/profile/${localUserId}`),
            ])
            .then(
              axios.spread((tokenResponse, profileResponse) => {
                if (
                  tokenResponse.status === 200 &&
                  profileResponse.status === 200
                ) {
                  const { accessToken, refreshToken } = tokenResponse.data;

                  //set the token and userId in local storage
                  localStorage.setItem(
                    "token",
                    JSON.stringify({
                      accessToken,
                      refreshToken,
                      createdAt: new Date().getTime(),
                    })
                  );

                  // update the auth state
                  dispatchAuth({
                    type: actions.auth.LOGIN,
                    payload: {
                      accessToken,
                      refreshToken,
                      user: profileResponse.data,
                    },
                  });
                }
              })
            )
            .catch((error) => {
              throw new Error(error);
            });
        }
      }
    }
    setIsChecking(false);
  }, []);

  return isChecking;
};

export default useLoginCheck;
