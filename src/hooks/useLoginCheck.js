import { actions } from "@actions/actions";
import { api } from "@api/api";
import axios from "axios";
import { useEffect } from "react";

const useLoginCheck = (auth, dispatchAuth) => {
  useEffect(() => {
    if (!auth || !auth.accessToken) {
      const localToken = localStorage.getItem("token"); //get the token from local storage
      const localUserId = localStorage.getItem("userId"); //get the user from local storage
      console.log("localuserId: ", localUserId);
      if (localToken && localUserId) {
        const { refreshToken, createdAt } = JSON.parse(localToken); //parse the token

        const now = new Date().getTime();
        const diff = now - createdAt;

        if (diff < 24 * 60 * 60 * 1000) {
          axios
            .all([
              api.post(`/auth/refresh-token`, { refreshToken }),
              api.get(`/profile/${localUserId}`),
            ])
            .then(
              axios.spread((res1, res2) => {
                if (res1.status === 200 && res2.status === 200) {
                  const { accessToken, refreshToken } = res1.data;
                  localStorage.setItem(
                    "token",
                    JSON.stringify({
                      accessToken,
                      refreshToken,
                      createdAt: new Date().getTime(),
                    })
                  );
                  dispatchAuth({
                    type: actions.auth.LOGIN,
                    payload: { accessToken, refreshToken, user: res2.data },
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
  }, []);
};

export default useLoginCheck;
